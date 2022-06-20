import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { createDataSet } from "./data/dataset"
import "./App.css"
import {Header} from  "./components/Header/Header"
import {Instructions} from  "./components/Instructions/Instructions"
import {Chip} from "./components/Chip/Chip"
import { useState } from "react"
import {NutritionalLabel, NutritionalLabelFact} from "./components/NutritionalLabel/NutritionalLabel"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

export function App() {
 
  let [chosenCategory, setCategory] = useState(false)
  let [chosenResturant, setRestaurant] = useState("")
  let [chosenItem, setItem] = useState("")
  let currentMenuItems = data.filter(item => item.food_category == chosenCategory && item.restaurant == chosenResturant)
  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((category, index) => {
            let activeState = false
            if(category == chosenCategory){
              activeState = true
            }
            return <Chip key = {category + toString(index)} 
            label = {category} 
            clickFunction = {() => {
              setCategory(category)
            }}
            isActive = {activeState}></Chip>
          })}
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {Header(appInfo)}
        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
          {restaurants.map((restaurant, index) => {
            let activeState = false
            if(restaurant == chosenResturant){
              activeState = true
            }
            return <Chip label = {restaurant} 
            clickFunction = {() => {
              setRestaurant(restaurant)
            }}
            isActive = {activeState} key = {restaurant + toString(index)}></Chip>
          })} 
          </div>
        </div>

        {Instructions(appInfo.instructions)}

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {currentMenuItems.map((item, index) => {
            let activeState = false
            if(item.item_name == chosenItem.item_name){
              activeState = true
            }
            return <Chip label = {item.item_name} 
            clickFunction = {() => {
              setItem(item)
            }}
            isActive = {activeState} key = {item.item_name + toString(index)}></Chip>
          })} 
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            {
              <NutritionalLabel key = "Nutrition" item = {chosenItem}/>
            }
          </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
