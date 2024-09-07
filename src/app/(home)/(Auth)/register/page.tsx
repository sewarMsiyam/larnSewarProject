'use client';
import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("sewar");


    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('password', password);

    console.log(formData);

    const response = await fetch('https://sewaar.test/api/v1/register', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('User registered successfully', data);
      // هنا يمكنك إعادة التوجيه أو تسجيل المستخدم بشكل إضافي
    } else {
      console.error('Registration failed', data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Mobile" 
        value={mobile} 
        onChange={(e) => setMobile(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
