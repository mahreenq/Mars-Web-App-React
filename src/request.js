import $ from 'jquery';

const getEncounters = new Promise((resolve, reject) => {
  $.ajax({
    url: "https://red-wdp-api.herokuapp.com/api/mars/encounters",
    method: "GET"
  })
    .done((data) => {
      if (data.status === "encounters") {
        resolve(data);
      }
      else {
        reject();
      }
    })
    .fail((err) => {
      reject(err);
    });
});

// const getPuppyFact = new Promise((resolve, reject) => {
//   /*
//   $.ajax({
//     url: "http://cors-proxy.htmldriven.com/?url=https://dog-api.kinduff.com/api/facts",
//     method: "GET",
//   })
//     .done((data) => {
//       if (data.success) {
//         resolve(data);
//       }
//       else {
//         reject();
//       }
//     })
//     .fail((err) => {
//       reject(err);
//     });
//     */
//   resolve("dogs are cool");
// });

export {getEncounters};
