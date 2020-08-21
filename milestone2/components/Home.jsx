import React from 'react';
import AppRouter from './AppRoute.jsx';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
  }
  componentDidMount() {
    let userName = localStorage.getItem('username');
    this.setState({userName});
  }
  render() {
    return (
      <div>
        <AppRouter username = {this.state.userName}></AppRouter>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-lg-12 text-center">
            <h2>Summary</h2>
                  <p>When you get care from a doctor or other health care provider, they send us a bill called a claim. Your claim summary helps you see what the provider billed, what we paid, and what your share of the cost is.
                  Your official decision of unemployment comes from the state in the form of a Notice of Determination. This is a form the state that says what the decision is and how the state came to it. It usually lists your previous wages and the employers you earned them from.
                  Your last payment issued and claim balance appear at the bottom of the homepage in the Claim Summary section. ... You can view the following information from the Payment Activity page for each payment: Issue Date. Amount Paid. Payment Status.
                  What Happens After I File My Initial Claim For Unemployment Benefits? After you file your claim, you will be mailed a form called the Monetary Record. This form will show: ... The gross wages paid to you in the base period by each employer that is covered by unemployment insurance.
                  The federal Department of Labor's website says that you can expect your first unemployment check two or three weeks after you apply, as long as you submit all of the required information, and no follow-up is necessary.
                  </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;