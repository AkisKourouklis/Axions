import { PayPalButton } from 'react-paypal-button-v2';

// sb-dvvfx1645509@business.example.com
// co%pKV9d

const Paypal = ({ ammount, onSuccess, onError }) => {
  return (
    <PayPalButton
      amount={ammount}
      onSuccess={(details, data) => onSuccess(details, data)}
      onError={onError}
      options={{
        clientId:
          'AQvAN7io_MyV0SiHSUNlVjvC4KcH8x20KFnZCJbCrJeByvUA5LT_SLKc4UgKOfLSTq6bSo4ksP5Mu7b3',
        // 'AVFGpHraJD7ppuO-0pcphvEUhc8qrrl9dxTd_1XvJjOftLmE7potOIDK62HP55NbkVF3dwgNEwh2cj4P',
        currency: 'EUR'
      }}
      shippingPreference="NO_SHIPPING"
    />
  );
};

export default Paypal;
