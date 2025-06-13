import React from 'react';
import { Award, Users, Truck, HeadphonesIcon } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We source only the finest materials and work with skilled artisans to create products that stand the test of time.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We listen, adapt, and continuously improve to exceed your expectations.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly and safely with our reliable shipping partners worldwide.',
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Our dedicated support team is always ready to help you with any questions or concerns.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Visionary leader with 15+ years in fashion industry',
    },
    {
      name: 'Michael Chen',
      role: 'Creative Director',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Award-winning designer passionate about sustainable fashion',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Operations expert ensuring smooth customer experience',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="About Hero"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              About Heven
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We're more than just a fashion brand. We're a community of individuals who believe 
              in the power of style to express identity, build confidence, and create connections.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, Heven began as a small dream to create fashion that doesn't 
                  compromise on quality, ethics, or style. What started in a small studio has 
                  grown into a global brand trusted by thousands of customers worldwide.
                </p>
                <p>
                  We believe that great fashion should be accessible to everyone. That's why we 
                  work directly with manufacturers, cutting out middlemen to bring you premium 
                  quality at fair prices. Every piece in our collection is carefully curated 
                  to ensure it meets our high standards for craftsmanship and design.
                </p>
                <p>
                  Today, we continue to push boundaries, embrace innovation, and stay true to 
                  our core values of quality, sustainability, and customer satisfaction.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Story"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Heven</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional value through quality products, 
              outstanding service, and meaningful customer relationships.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Heven who work tirelessly to bring you 
              the best fashion experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-2 font-medium">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            To democratize premium fashion by making high-quality, stylish clothing accessible 
            to everyone while maintaining ethical production practices and exceptional customer service. 
            We strive to be more than just a clothing brand – we aim to be your trusted style partner.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">5</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;