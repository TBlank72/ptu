/*
$(document).ready(function() {
  var handler = StripeCheckout.configure({
    key: 'pk_test_goY37sIUEpPSgwaXAGGKQKr3',
    image: 'https://s3.amazonaws.com/stripe-uploads/acct_17w34LKy169gouUDmerchant-icon-1459810632898-ptStripeLogo.png',
    locale: 'auto',
    panelLabel: 'Donate',
    token: function(token) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    }
  });
  $('#customButton').on('click', function(e) {
    var price = $('#donation_amount').val() * 100;
  // Open Checkout with further options:
    handler.open({
      name: 'PT University',
      description: 'Donation',
      amount: price
    });
    e.preventDefault();
  });
  // Close Checkout on page navigation:
  $(window).on('popstate', function() {
    handler.close();
  });
}); // end document ready
*/
