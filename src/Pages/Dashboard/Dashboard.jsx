import React from 'react'
import BoxBasic from './BoxBasic'
import SimpleBottomNavigation from '../../components/SimpleBottomNavigation'
import FilterHeader1 from './FilterHeader1'
import CarouselComponent from './CarouselComponent'
import Filter2 from './Filter2'
function Dashboard() {
  return (
    <div>
    
    <FilterHeader1/>
    <CarouselComponent/>
    <Filter2/>
    <BoxBasic/>
    <SimpleBottomNavigation/>
    </div>
  )
}

export default Dashboard

