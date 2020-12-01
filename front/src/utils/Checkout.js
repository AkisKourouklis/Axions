import { axiosCallApi, publicApi } from '../config/api';

export const discount = (discountPromo, courseData) => {
  return axiosCallApi
    .post(
      `${publicApi}/promoCodes/check/`,
      {
        promoCode: discountPromo,
        courses: [courseData]
      },
      {
        headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
      }
    )
    .then((response) => {
      return response.data.courses[0];
    })
    .catch((err) => {
      console.log(err);
      return 'error';
    });
};

export const saveTransaction = (value) => {
  // axiosCallApi.post(`${publicApi}/transaction`, value, {
  //   headers: {
  //     authorization: 'Bearer ' + localStorage.getItem('jwtToken')
  //   }
  // });
  console.log('VALUE', value);
};

export const addCourse = (course, id) => {
  axiosCallApi
    .post(
      `${publicApi}/subscribers/addCourse/client`,
      { id, course },
      {
        headers: { authorization: 'Bearer ' + localStorage.getItem('jwtToken') }
      }
    )
    .then(() => {
      saveTransaction(course);
      // router.push('/account/mycourses');
      setShowPaypal(false);
    });
};
