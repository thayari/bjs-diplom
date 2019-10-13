'use strict';

function exchangeRate(callback) {
  return ApiConnector.getStocks((err, data) => {
    if (err) {
      console.error('Error during getting exchange rates');
    } else {
      console.log(`Exchange rates downloaded`);
      callback(err, data);
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
          console.error('Creating user error');
        } else {
          console.log(`New user ${username} created`);
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
          console.error('Login error');
        } else {
          console.log(`Login performed: ${username}`);
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
          console.error('Error during adding money');
        } else {
          console.log(`${amount} ${currency} added to ${this.username}`);
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
          console.error('Error during converting money');
        } else {
          console.log(`Converted ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
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
          console.error('Error during transfering money');
        } else {
          console.log(`${amount} Netcoins were transfered to ${to}`);

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

  const spiderman = new Profile(
    {
      username: 'spiderman',
      name: {
        firstName: 'Peter',
        lastName: 'Parker'
      },
      password: 'maryjane'
    }
  )



  wolverine.addUser(() => {
    wolverine.login(() => {
      console.log(`Adding money to ${wolverine.username}...`);
      wolverine.addMoney({
        currency: 'USD',
        amount: 30000
      },
        () => {
          console.log(`Converting to Netcoins...`);
          exchangeRate((err, data) => {
            let sum = 30000 * Number(data[99].USD_NETCOIN);
            wolverine.convertMoney({
              fromCurrency: 'USD',
              targetCurrency: 'NETCOIN',
              targetAmount: sum
            },
              () => {
                console.log('Transfering money...');
                spiderman.addUser(() => {
                  wolverine.transferMoney({
                    to: spiderman.username,
                    amount: sum
                  }, () => console.log('Transaction complete.'))
                })
              })
          });
        }
      )
    }
    )
  });


}



