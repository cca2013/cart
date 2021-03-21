import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';


  const onSuccess = (payment) =>
    console.log('Successful payment!', payment);
 
    const onError = (error) =>
    console.log('Erroneous payment OR failed to load script!', error);
 
    const onCancel = (data) =>
    console.log('Cancelled payment!', data);
 
class PayPalButton extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      showButton: false,
      env: 'sandbox', // Or 'sandbox'
      client: {
        sandbox: 'ARDbx3MuUA109TlhAhTpM_TXWomh-m2laUm4WEOHkk9ykhT0A8ioQS2mKKqPnMl3FVUsWoabU99Ammqv', // sandbox client ID
        production: '' // production client ID
      },
      commit: true, // Show a 'Pay Now' button
    };
  
	
	 window.React = React;
    window.ReactDOM = ReactDOM;
  }
 
  componentDidMount() {
	  const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = this.props;
 
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
    // Todo
  }
 
  componentWillReceiveProps(nextProps) {
	   const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps;
 
    const isLoadedButWasntLoadedBefore =
      !this.state.showButton &&
      !this.props.isScriptLoaded &&
      isScriptLoaded;
 
    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
    // Todo
  }
  render() {
	  //const paypal = window.PAYPAL;
    const {
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
    } = this.props;
 
    const {
      showButton,
    } = this.state;
 
    const payment = () =>
      paypal.rest.payment.create(env, client, {
        transactions: [
          {
            amount: {
              total,
              currency,
            }
          },
        ],
      });
 
    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = 
		  {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };
 
          onSuccess(payment);
        }
		);
		
		
 
    return (
      <div>
        {showButton && <paypal.Button.react
          env={env}
          client={client}
          commit={commit}
          payment={payment}
          onAuthorize={onAuthorize}
          onCancel={onCancel}
          onError={onError}
        />}
      </div>
    );
  }
}
export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PayPalButton);


