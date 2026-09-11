const { SEED_PRODUCTS, SEED_PINCODES } = require('../utils/seeder');

// Memory store for when standalone MongoDB server is not running
const store = {
  products: JSON.parse(JSON.stringify(SEED_PRODUCTS)),
  pincodes: JSON.parse(JSON.stringify(SEED_PINCODES)),
  users: [
    {
      _id: '65f1a1000000000000000099',
      name: 'Rohan Sharma',
      phone: '9876543210',
      email: 'rohan.sharma@example.com',
      addresses: [
        {
          _id: 'addr_1',
          name: 'Rohan Sharma',
          phone: '9876543210',
          pincode: '560001',
          locality: 'Koramangala 5th Block',
          addressLine: 'Flat 402, Prestige Towers',
          city: 'Bengaluru',
          state: 'Karnataka',
          landmark: 'Near Forum Mall',
          addressType: 'HOME',
          isDefault: true
        },
        {
          _id: 'addr_2',
          name: 'Rohan Sharma (Office)',
          phone: '9876543210',
          pincode: '560103',
          locality: 'Bellandur Tech Park',
          addressLine: 'EcoWorld Building 4B, 3rd Floor',
          city: 'Bengaluru',
          state: 'Karnataka',
          landmark: 'Outer Ring Road',
          addressType: 'WORK',
          isDefault: false
        }
      ]
    }
  ],
  orders: [
    {
      _id: 'ORD-FK9842',
      user: '65f1a1000000000000000099',
      orderItems: [
        {
          product: '65f1a1000000000000000001',
          title: 'Apple iPhone 15 (Blue, 128 GB)',
          image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop',
          price: 71999,
          quantity: 1
        }
      ],
      shippingAddress: {
        name: 'Rohan Sharma',
        phone: '9876543210',
        pincode: '560001',
        locality: 'Koramangala 5th Block',
        addressLine: 'Flat 402, Prestige Towers',
        city: 'Bengaluru',
        state: 'Karnataka',
        addressType: 'HOME'
      },
      paymentMethod: 'RAZORPAY',
      paymentResult: { status: 'PAID', razorpayPaymentId: 'pay_sim_9281726' },
      itemTotal: 71999,
      deliveryFee: 0,
      totalPrice: 71999,
      orderStatus: 'Shipped',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      trackingTimeline: [
        { status: 'Ordered', date: new Date(Date.now() - 86400000 * 2).toISOString(), description: 'Order confirmed and authorized' },
        { status: 'Packed', date: new Date(Date.now() - 86400000).toISOString(), description: 'Seller packed your item at Bengaluru Hub' },
        { status: 'Shipped', date: new Date().toISOString(), description: 'Item has shipped via Ekart Logistics' }
      ]
    }
  ]
};

module.exports = store;
