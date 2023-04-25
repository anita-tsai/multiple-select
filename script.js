const CustomSelect = {
  init: (passedSelectDOMs = []) => {
    // to customize which select need to change
    const selectDOMs = passedSelectDOMs.length > 0
      ? passedSelectDOMs
      : document.querySelectorAll('select')

    // to get every select
    selectDOMs.forEach(selectDOM => {
      // to hide the original select
      selectDOM.style.display = 'none'
      // sync init state from html selected options
      const optionsDOM = selectDOM.options

      // selected options
      let state = Array
        .from(optionsDOM)
        .filter(e => e.selected)
        .map(e => e.value)

      // all options
      let options = Array
        .from(optionsDOM)
        .map(e => e.value)

      // to create a new select div 
      const parentElement = selectDOM.parentElement
      const selectInputDOM = document.createElement('div')
      selectInputDOM.style.border = '1px solid black'
      selectInputDOM.style.width = '350px'
      selectInputDOM.style.minHeight = '30px'
      selectInputDOM.style.display = 'flex'
      selectInputDOM.style.justifyContent = 'flex-end' 
      selectInputDOM.style.alignItems = 'stretch' // adjust height dynamically

      // to show selected options in selectInputDOM
      const selectInputContentDOM = document.createElement('div')

      selectInputContentDOM.style.display = 'flex'
      selectInputContentDOM.style.flexWrap = 'wrap'
      selectInputContentDOM.style.width = '100%'

      selectInputDOM.appendChild(selectInputContentDOM)

      // to find children's index for insert the right position
      const childrenIndex = Array.from(parentElement.children).indexOf(selectDOM)

      // add a fn for option in selectInputDOM
      const appendInputOption = (value) => {
        const label = document.createElement('div')
        label.innerHTML = value
        label.style.backgroundColor = '#D3D3D3'
        label.style.margin = '5px'
        label.style.borderRadius = '10px'

        // add a cancel button
        const cancelBtnDOM = document.createElement('button')
        cancelBtnDOM.innerHTML = 'X'
        cancelBtnDOM.setAttribute('value', value)
        cancelBtnDOM.style.border = '0'
        cancelBtnDOM.style.background = 'transparent'

        // click cancelBtnDOM
        cancelBtnDOM.addEventListener('click', () => {
          updateState(cancelBtnDOM.value)
        })

        label.appendChild(cancelBtnDOM)
        selectInputContentDOM.appendChild(label)
      }

      // add a fn for option in dropdownDOM
      const appendDropdownOption = (value, isSelected = false) => {
        // create new options
        const newOptionDOM = document.createElement('option')
        newOptionDOM.text = value
        newOptionDOM.style.display ='block'
        newOptionDOM.style.width = '100%'
        newOptionDOM.style.padding = '5px'

        // create checkboxDOM
        const checkboxDOM = document.createElement('input')
        checkboxDOM.setAttribute('type', 'checkbox')
        checkboxDOM.setAttribute('value', value)
        checkboxDOM.checked = isSelected

        // click checkboxDOM
        checkboxDOM.addEventListener('click', () => {
          updateState(checkboxDOM.value)
        })
        
        // to make checkboxDOM and newOptionDOM in one line
        const optionWrapperDOM = document.createElement('div')
        optionWrapperDOM.style.display = 'flex'
        
        // hover the newOptionDOM and checkboxDOM
        optionWrapperDOM.addEventListener('mouseover', () => {
          optionWrapperDOM.style.backgroundColor = '#E0FFFF'
        })
    
        optionWrapperDOM.addEventListener('mouseout', () => {
          optionWrapperDOM.style.backgroundColor = ''
        })

        // add to parentElement
        optionWrapperDOM.appendChild(checkboxDOM)
        optionWrapperDOM.appendChild(newOptionDOM)
        dropDownDOM.appendChild(optionWrapperDOM)
      }

      const updateState = (value) => {
        // only update state if value passed
        if (value) {
          const filterResult = state.filter(e => e !== value)
          if(filterResult.length === state.length) {
            state = [...state, value] 
          } else {
            state = filterResult
          }
        }

        // sync select input
        selectInputContentDOM.innerHTML = ''
        for(let i = 0; i < state.length; i++) {
          appendInputOption(state[i])
        }

        // sync select dropdown
        dropDownDOM.innerHTML = ''
        for(let i = 0; i < options.length; i++) {
          const isSelected = state.filter(e => e === options[i]).length > 0
          appendDropdownOption(options[i], isSelected)
        }

        // to sync the original option 
        const originOptionsDOM = selectDOM.querySelectorAll('option')
        for(let i = 0; i < originOptionsDOM.length; i++) {
          const result = state.filter(e => e === originOptionsDOM[i].value)
          if(result.length > 0) {
            originOptionsDOM[i].selected = true
          } else {
            originOptionsDOM[i].selected = false
          }
        }
      }

      // to add a button into selectInputDOM
      const dropDownButtonDOM = document.createElement('button')
      dropDownButtonDOM.type = 'button'
      dropDownButtonDOM.innerText = '▼'
      dropDownButtonDOM.style.border = 'none'
      dropDownButtonDOM.style.borderLeft = '1px solid black'
      dropDownButtonDOM.style.cursor = 'pointer'
      selectInputDOM.appendChild(dropDownButtonDOM)

      // to create a new div to show the original select's option
      const dropDownDOM = document.createElement('div')
      dropDownDOM.style.display = 'none'
      dropDownDOM.style.alignItems = 'center'
      dropDownDOM.style.justifyContent = 'center'
      dropDownDOM.style.flexWrap = 'wrap'  // change line
      dropDownDOM.style.width = '350px'
      dropDownDOM.style.minHeight = '30px'
      dropDownDOM.style.maxHeight = '300px'
      dropDownDOM.style.border = '1px solid black'
      dropDownDOM.style.overflow = 'scroll'

      // click button to close or open the dropDownDOM
      dropDownButtonDOM.addEventListener('click', function(){
        if(dropDownDOM.style.display === 'none') {
          dropDownDOM.style.display = 'block'
          dropDownButtonDOM.innerHTML = '▲'
        } else {
          dropDownDOM.style.display = 'none'
          dropDownButtonDOM.innerHTML = '▼'
        }
      })

      // the button need to change color when click
      dropDownButtonDOM.addEventListener('mouseover', () =>{
        dropDownButtonDOM.style.backgroundColor = 'gray'
      })

      dropDownButtonDOM.addEventListener('mouseout', () =>{
        dropDownButtonDOM.style.backgroundColor = ''
      })

      // to make selectInputDOM and dropDownDOM in a div
      const newSelectDOM = document.createElement('div')

      newSelectDOM.appendChild(selectInputDOM)
      newSelectDOM.appendChild(dropDownDOM)
      parentElement.insertBefore(newSelectDOM, parentElement.children[childrenIndex])

      updateState()
    }
  )}
}
    


// For demo select options original usage
document.getElementById('submitButton').addEventListener('click', () => { 
  const value1 = Array
    .from(document.getElementById('select1').selectedOptions)
    .map(o => o.value)
  console.log(value1)
  const value2 = Array
    .from(document.getElementById('select2').selectedOptions)
    .map(o => o.value)
  console.log(value2)
})
