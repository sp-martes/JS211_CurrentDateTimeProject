class BankAccount{
    constructor(accountNumber,owner){
    this.accountNumber = accountNumber
    this.owner = owner
    this.transactions = []  
    }
    
    balance(){
        let balance = 0
        this.transactions.forEach((each) =>{
            balance += each.amount
        });
        return  balance
    }

    deposit(amt){
        if(amt>0){
            let depositTransaction = new Transaction(amt,this.owner)
            this.transactions.push(depositTransaction)
        }
        else{
            return 'Alert: Must deposit more than 0.00'
        }
    }

    charge(amt,recipient){
        if(amt <= this.balance()){
            let chargeTransaction = new Transaction(amt*-1,recipient)
            this.transactions.push(chargeTransaction)
        }
        else{
            return 'Alert: Insufficient Funds'
        }
        
    }
}

class Transaction{
    constructor(amount,recipient){
        this.amount = amount
        this.recipient = recipient
        this.date = new Date().toDateString()
    }

}

class SavingsAccount extends BankAccount{
    constructor(accountNumber,owner,interestRate,initialDeposit){
    super(accountNumber,owner);
    this.interestRate = interestRate
    this. initialDeposit = initialDeposit
    this.startDate = new Date().toDateString()
    
    }
    accrueInterest(){

    }


}

let johnSmith = new BankAccount(35472,'John')

johnSmith.deposit(150)
console.log('johns account balance:', johnSmith.balance())
johnSmith.charge(160,'lids')
johnSmith.charge(120,'walmart')
console.log('john smith lids charge:',johnSmith.charge(160,'lids'))
console.log('johns account:', johnSmith)
console.log('johns account balance after walmart:', johnSmith.balance())
console.log(johnSmith.deposit(-5))


