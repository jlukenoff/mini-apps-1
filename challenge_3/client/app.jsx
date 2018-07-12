const F1 = (props) => {
  
  let handleSubmit = () => {
    let data = {
      username: $('#username').val(),
      email: $('#email').val(),
      pword: $('#password').val()
    };
    $.post('http://127.0.0.1:3000/signin', data);
    props.click(data.username, data);
  };

  return (
    <div>
      <h2>name:</h2>
      <input type="text" id="username"/>
      <h2>email:</h2>
      <input type="text"  id="email"/>
      <h2>password:</h2>
      <input type="text"  id="password"/>
      <br/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
const F2 = (props) => {
  let handleSubmit = () => {
    let data = {
      streetNum: $('#street-num').val(),
      streetName: $('#street').val(),
      city: $('#city').val(),
      state: $('#state').val(),
      zip: $('#zip').val(),
      phone: $('#phone').val(),
      user: props.user
    };
    $.post('http://127.0.0.1:3000/address', data);
    props.click(null, data);
  };

  return (
    <div>
      <h2>Street Address:</h2>
      <input type="text" placeholder="Address line 1..." id="street-num"/>
      <input type="text" placeholder="Address line 2..." id="street-name"/>
      <h2>City:</h2>
      <input type="text" id="city"/>
      <h2>State:</h2>
      <input type="text" id="state"/>
      <h2>Zip Code:</h2>
      <input type="text" id="zip"/>
      <h2>Phone:</h2>
      <input type="text" id="phone"/>
      <br/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
const F3 = (props) => {
  let handleSubmit = () => {
    let data = {
      ccNum: $('#cc-num').val(),
      expDate: $('#exp-date').val(),
      cvv: $('#cvv').val(),
      billZip: $('#zip').val(),
      user: props.user
    }
    $.post('http://127.0.0.1:3000/cc', data);
    props.click(false, data);
  };
  return (
    <div>
      <h2>Credit Card #:</h2>
      <input type="text" id="cc-num"/>
      <h2>Expiration Date:</h2>
      <input type="text" id="exp-date"/>
      <h2>CVV:</h2>
      <input type="text" id="cvv"/>
      <h2>Billing ZIP:</h2>
      <input type="text" id='zip'/>
      <br/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

const F4 = (props) => {
  
  return (
    <div style={{listStyle: 'none'}}>
      <h2>Confirm your info:</h2>
      <ul>
        <li>Name:{props.userData().username}</li>
        <li>email:{props.userData().email}</li>
        <li>Address:{props.userData().streetNum + ' ' + props.userData().streetName}</li>
        <li>city:{props.userData().city}</li>
        <li>State:{props.userData().state}</li>
        <li>ZIP:{props.userData().zip}</li>
        <li>CC#:{props.userData().ccNum}</li>
        <li>Exp:{props.userData().expDate}</li>
        <li>cvv:{props.userData().cvv}</li>
        <li>Billing ZIP:{props.userData().billZip}</li>
      </ul>

      
      <button onClick={props.click}>Purchase</button>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'checkout',
      pages: [
        'checkout', 
        <F1 click={(user, data) => this.handleCheckout(user, data)}/>,
        <F2 click={(user, data) => this.handleCheckout(user, data)} user={() => this.currentUser}/>, 
        <F3 click={(user, data) => this.handleCheckout(user, data)} user={() => this.currentUser}/>, 
        <F4 click={(user, data) => this.handleCheckout(user, data)} user={() => this.currentUser} userData={() => this.currentUserData}/>
      ],
      pageIndex: 0
    };
    this.currentUser = '';
    this.currentUserData = {};
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handleCheckout(user, data) {
    let nextIndex = this.state.pageIndex === 4 ? 0 : this.state.pageIndex + 1;
    let nextPage = this.state.pages[nextIndex];
    this.currentUser = user || this.currentUser;
    if (data) {
      this.currentUserData = Object.assign(this.currentUserData, data);
      console.log(this.currentUserData);
    }
    this.setState({
      page: nextPage,
      pageIndex: nextIndex
    });
  }

  render() {
    return (
      <div className="app">
      {(function() {
        if (this.state.page === 'checkout') {
          return <button onClick={this.handleCheckout}>Checkout</button>
        } else {
          return this.state.page;
        }
      }).bind(this)()
      }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

