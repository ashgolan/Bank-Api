export const index = `
* when joining to the bank, the client needs to provide the following details: name, last name and he's official ID number,
* this number will be hide in the data base, and a uniqe uid will be assigned, to prevent leack of sensitive data.

USERS:

 GET all users:
     fetch("https://bankapi-5xef.onrender.com/api/users")

 POST new user:
     fetch("https://bankapi-5xef.onrender.com/api/users")
     body:{
          id: Number
          name: String
          lastName: string
     }

 GET user:
     fetch("https://bankapi-5xef.onrender.com/api/users/:uid")

ACCOUNTS:

 GET all accounts:
     fetch("https://bankapi-5xef.onrender.com/api/accounts")

 POST new accounts:
     fetch("https://bankapi-5xef.onrender.com/api/accounts")
     body:{
          owner: user uid 
          type: "personal/business" 
     }

 GET account:
     fetch("https://bankapi-5xef.onrender.com/api/accounts/:uid")

TRANSACTIONS:

 POST new transaction:
     fetch("https://bankapi-5xef.onrender.com/api/transactions")

* to post a new deposit/withdraw/transfer:
     body:{
          accountNumber:  number
          type: "deposit,withdraw,credit",
          amount: number
     }
* to post a new deposit/withdraw/transfer:
     body:{
          accountNumber: user account number (the sender)
          type: "transfer",
          recipient: recipient account number
          amount: number
     }

QUERIES:

GET- retrieve all data of the bank:
     ("https://bankapi-5xef.onrender.com/api/bank/all")
     
GET- get all accounts of the provided user (optional: with minimum amount of cash )
     ("https://bankapi-5xef.onrender.com/api/bank/accounts?user=<useruid>&amount=<amount>")


`;
