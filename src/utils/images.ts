import Random1 from '../../public/images/random1.jpg'
import Random2 from '../../public/images/random2.jpg'
import Random3 from '../../public/images/random3.jpg'
import Random4 from '../../public/images/random4.jpg'
import Random5 from '../../public/images/random5.jpg'
import Random6 from '../../public/images/random6.jpg'
import Random7 from '../../public/images/random7.jpg'
import Random8 from '../../public/images/random8.jpg'
import Random9 from '../../public/images/random9.jpg'
import Random10 from '../../public/images/random10.jpg'
import { randomFromZeroToNumber } from './func'

const listImage = [Random1, Random2, Random3, Random4, Random5, Random6, Random7, Random8, Random9, Random10]
export const randomImage = (length = 10): string => {
    randomFromZeroToNumber(length - 1)
    return listImage[randomFromZeroToNumber(length - 1)].src
}