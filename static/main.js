"strict use";

function exchangeRate() {
  return ApiConnector.getStocks((err, data) => {
      if (err) {
        console.log('Error during getting exchange rates');
      } else {
        console.log(`Exchange rates downloaded`);
      }
    })
}


class Profile {
  constructor({ username, name: { firstName, lastName }, password }) {
    this.username = username;
    this.name = {
      firstName: firstName,
      lastName: lastName
    };
    this.password = password;
  }


  addUser(callback) {
    let username = this.username;
    let name = this.name;
    let password = this.password;
    return ApiConnector.createUser(
      {
        username,
        name,
        password
      },
      (err, data) => {
        if (err) {
          console.log('Creating user error');
        } else {
          console.log(`Creating new user ${username}`);
          callback(err, data);
        }
      })
  }

  login(callback) {
    let username = this.username;
    let password = this.password;
    return ApiConnector.performLogin(
      {
        username,
        password
      },
      (err, data) => {
        if (err) {
          console.log('Login error');
        } else {
          console.log(`Performing login: ${username}`);
          callback(err, data);
        }
      })
  }

  addMoney({ currency, amount }, callback) {
    return ApiConnector.addMoney(
      {
        currency,
        amount
      },
      (err, data) => {
        if (err) {
          console.log('Error during adding money');
        } else {
          console.log(`Adding ${amount} of ${currency} to ${this.username}`);
          callback(err, data);
        }
      })
  }


  convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {

    return ApiConnector.convertMoney(
      {
        fromCurrency,
        targetCurrency,
        targetAmount
      },
      (err, data) => {
        if (err) {
          console.log('Error during converting money');
        } else {
          console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
          callback(err, data);
        }
      })
  }

  transferMoney({ to, amount }, callback) {
    return ApiConnector.transferMoney(
      { 
        to, 
        amount 
      },
      (err, data) => {
        if (err) {
          console.log('Error during transfering money');
        } else {
          console.log(`Transfering ${amount} Netcoins to ${to}`);

          callback(err, data);
        }
      }
    )
  }

  

}




function main() {
  const wolverine = new Profile({
    username: 'wolverine',
    name: {
      firstName: 'James',
      lastName: 'Howlett'
    },
    password: 'beer',
  });
  
  wolverine.addUser(
    wolverine.login(
      wolverine.addMoney({
        currency: "USD",
        amount: 300
      },
      convertMoney)
    )
  );
  
}

main();

