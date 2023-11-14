import {motion} from 'framer-motion';

import { staggerContainer } from '../utils/utils';


export const SectionWrapper = (Component: any, idName:string) => 
  function HOC(){
    return (
      <motion.section
        variants={staggerContainer(undefined, undefined)}
        initial="hidden"
        whileInView="show"
        viewport={{once: true, amount: 0.25}}
       
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    )
}
