import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'


export const reviewService = {
  add,
  query,
  remove
}

function query(filterBy) {
  const something = httpService.get('review', filterBy)
  console.log('something', something);
  return something
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`;
  // console.log(filterBy);
  // if (filterBy.aboutToyId) {
  //   queryStr += `&aboutToyId=${filterBy.aboutToyId}`;
  // }

  // return httpService.get(`review${queryStr}`);
}


async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
  // await storageService.remove('review', reviewId)
}

async function add({ txt, aboutToyId }) {
  console.log('txt', txt);
  console.log('aboutToyId', aboutToyId);
  const addedReview = await httpService.post('review', { txt, aboutToyId })

  // const aboutUser = await userService.getById(aboutUserId)

  // const reviewToAdd = {
  //   txt,
  //   byUser: userService.getLoggedinUser(),
  //   aboutUser: {
  //     _id: aboutUser._id,
  //     fullname: aboutUser.fullname,
  //     imgUrl: aboutUser.imgUrl
  //   }
  // }

  // reviewToAdd.byUser.score += 10
  // await userService.update(reviewToAdd.byUser)
  // const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}