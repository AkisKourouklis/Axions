import React from 'react';
import { useForm } from 'react-hook-form';
import Account from './Account';

const Settings = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Account>
        <p className="account-tab-title">Ο λογαριασμός σου</p>
        <form style={{ marginTop: '50px' }} onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <input
              className="account-input"
              name="email"
              placeholder="Email"
              ref={register({
                required: 'Required',
                pattern: {
                  message: 'invalid email address'
                }
              })}
            />
            {errors.email && errors.email.message}
          </div>
          {/* Name */}
          <div>
            <input
              className="account-input"
              name="name"
              placeholder="Όνομα Χρήστη"
              ref={register({
                required: 'Required',
                pattern: {
                  message: 'invalid email address'
                }
              })}
            />
            {errors.email && errors.email.message}
          </div>
          {/* Password */}
          <div>
            <select
              name="language"
              className="account-input"
              ref={register({
                required: 'Required',
                pattern: {
                  message: 'invalid email address'
                }
              })}
            >
              <option value="el">Ελληνικά</option>
              <option value="en">English</option>
            </select>

            {errors.email && errors.email.message}
          </div>
          <button type="submit" className="primary-button" style={{ maxWidth: '500px' }}>
            Αποθήκευση
          </button>
        </form>
      </Account>
    </>
  );
};

export default Settings;
