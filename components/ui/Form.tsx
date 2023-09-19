import { MEDUSA_BACKEND_URL } from '@/lib/config';
import Medusa from '@medusajs/medusa-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import router from 'next/router';
import { Button } from './Button';

export default function Form({ clientSecret, cartId, handlePlaceOrder }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });
  const cardElement = elements?.getElement(CardElement);

  const firstName = 'John';
  const lastName = 'Doe';
  const city = 'City';
  const country = 'ca';
  const line1 = '123 Main Street';
  const line2 = 'Apt 4B';
  const postalCode = '12345';

  async function handlePayment(e: any) {
    // e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const billingDetails = {
      name: `${firstName} ${lastName}`,
      address: {
        city,
        country,
        line1,
        line2,
        postal_code: postalCode,
      },
    };

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: billingDetails,
          },
        }
      );

      if (error) {
        console.error('Payment failed:', error.message);
      } else if (paymentIntent) {
        console.log('Payment succeeded:', paymentIntent);
        const { type, data } = await medusa.carts.complete(cartId);
        // medusa.carts.complete(cartId).then((resp) => {
        //   console.log('Cart completion response:', resp);
        // });
        router.push({
          pathname: '/order-confirmation',
          query: { id: data.id },
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    handlePlaceOrder();
  }

  return (
    <form>
      <CardElement />
      <Button
        size="lg"
        className="mt-10 w-full"
        // isDisabled={step !== 4}
        onPress={handlePayment}
      >
        Place an order
      </Button>
    </form>
  );
}
