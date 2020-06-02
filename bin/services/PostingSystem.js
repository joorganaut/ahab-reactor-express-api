const BaseSystem = require('./BaseSystem');
const TransactionType = require('../Core/enums/TransactionType');
const {Account} = require('../Core/data/Account');
const {Transaction} = require('../Core/data/Transaction');
const {Institution} = require('../Core/data/Institution');
const {TransactionModel} = require('../Core/models/data/TransactionModel');
const {SinglePostRequest} = require('../Core/models/CoreBanking/SinglePostRequest');
const {SinglePostResponse} = require('../Core/models/CoreBanking/SinglePostResponse');
const { v4:uuidv4 } = require('uuid');
class PostingSystem extends BaseSystem{
    constructor(response, props){
        super(props);
        this.response = response;
    }
    GenerateTransactionRef()
    {
        let result = BaseSystem.Empty();
        let guidRef = uuidv4().replace('-', '');
        let dateRef = BaseSystem.GetDate(false);
        result = `${guidRef}:${guidRef+dateRef}`;
        return result;
    }
    async Execute(request, institution, transaction){
        let result = null;
        let t = BaseSystem.IsNullOrUndefined(transaction)? await this.Sequelize.transaction() : transaction;
        try{
            let debitAccount = await this.RetrieveByParameter(Account, {AccountNumber : request.DebitAccount});
            if (BaseSystem.IsNullOrUndefined(debitAccount))
            {
                this.Error = `Unable to retrieve debit account with number ${request.DebitAccount}`;
                return null;
            }
            if (debitAccount.AccountBalance < request.Amount)
            {
                this.Error = `Insufficient Balance`;
                return null;
            }
            let creditAccount = await this.RetrieveByParameter(Account, {AccountNumber : request.CreditAccount});
            if (BaseSystem.IsNullOrUndefined(creditAccount))
            {
                this.Error = `Unable to retrieve credit account with number ${request.CreditAccount}`;
                return null;
            }
            let transactionRef = BaseSystem.IsNullOrWhiteSpace(request.TransactionRef) ? await this.GenerateTransactionRef() : request.TransactionRef;
            debitAccount.AccountBalance = debitAccount.AccountBalance - request.Amount;
            debitAccount.DateLastModified = BaseSystem.GetDate(true);
            creditAccount.AccountBalance = creditAccount.AccountBalance + request.Amount;
            creditAccount.DateLastModified = BaseSystem.GetDate(true);
            let debitTrans = new TransactionModel(
            {
                InstitutionID : institution.ID,
                InstitutionCode : institution.Code,
                DateCreated : BaseSystem.GetDate(true),
                GuidRef : string.IsNullOrWhiteSpace(request.TransactionRef)? transactionRef.split(':')[0] : request.TransactionRef,
                Amount : request.Amount,
                Account : debitAccount.AccountNumber,
                Type : TransactionType.DEBIT.value,
                Source : request.Source,
                DateLastModified : BaseSystem.GetDate(true),
                CreatedBy : request.Username,
                Narration : request.Narration,
                TransactionRef : string.IsNullOrWhiteSpace(request.TransactionRef) ? transactionRef.split(':')[1] : request.TransactionRef,
            });
            let creditTrans = new TransactionModel(
            {
                InstitutionID : institution.ID,
                InstitutionCode : institution.Code,
                DateCreated : BaseSystem.GetDate(true),
                GuidRef : string.IsNullOrWhiteSpace(request.TransactionRef) ? transactionRef.split(':')[0] : request.TransactionRef,
                Amount : request.Amount,
                Account : creditAccount.AccountNumber,
                Type : TransactionType.CREDIT.value,
                Source : request.Source,
                DateLastModified : BaseSystem.GetDate(true),
                CreatedBy : request.Username,
                Narration : request.Narration,
                TransactionRef : string.IsNullOrWhiteSpace(request.TransactionRef) ? transactionRef.split(':')[1] : request.TransactionRef,
            });
            await this.Update(debitAccount, { transaction: t});
            await this.Save(Transaction, debitTrans, { transaction: t});
            await this.Save(Transaction, creditTrans, { transaction: t});
            await this.Update(creditAccount, { transaction: t});
            if(BaseSystem.IsNullOrUndefined(transaction)){
                (await t).commit();
            }
            result = {
                TransactionRef : debitTrans.TransactionRef,
                Account : request.DebitAccount,
                AccountBalance : debitAccount.AccountBalance
            };
        }catch(e){
            this.Error = e;
            (await t).rollback();
        }
        return result;
    }
    async SinglePost(request, response){
        try{
            //validate institution
            let institution = await this.RetrieveByParameter(Institution, {Code : request.InstitutionCode});
            if(BaseSystem.IsNullOrUndefined(institution)){
                response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                response.Message = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message;
            }
            else{
                let result = await this.Execute(request, institution);
                if(BaseSystem.IsNullOrUndefined(result)){
                    response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
                    response.Message = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message + " "+this.Error;
                }else{
                    response = new SinglePostResponse(result);
                    response.Code = this.Responses.MessageResponse_SUCCESS.Code;
                    response.Message = this.Responses.MessageResponse_SUCCESS.Message;
                }
            }
        }catch(e){
            response.Code = this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Code;
            response.Message = `${this.Responses.MessageResponse_SYSTEM_MALFUNCTION.Message}: ${e.message}`;
        }
        return response;
    }
    async SinglePostAsync(){
        let request = new SinglePostRequest(this.response.req.body);
        let response = new SinglePostResponse(this.response.Response);
        if(this.response.Response.Code === '00'){
            response = await this.SinglePost(request, response);
        }
        this.response.res.send(response.ToString());
    }
}
module.exports = {PostingSystem};