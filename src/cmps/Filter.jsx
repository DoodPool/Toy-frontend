import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'
import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

export function Filter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ name: '', inStock: '', labels: [], ...filterBy })
  const toyLabels = toyService.getLabels()

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  onSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

  useEffect(() => {
    onSetFilterBy.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    console.log('just target', target)

    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      case 'select-multiple':
        const selectedOptions = Array.from(target.selectedOptions, (option) => option.value)
        value = selectedOptions
        break

      default:
        break
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }
  const { name, inStock, labels } = filterByToEdit

  return (
    <section className='toy-filter'>
      <form onSubmit={onSubmitFilter}>
        <div className='filter-input-wrapper'>
          <input type='text' name='name' id='name' placeholder='By name' value={name} onChange={handleChange} />
          <select id='inStock' value={inStock} name='inStock' onChange={handleChange}>
            <option value=''>All</option>
            <option value='true'>In stock</option>
            <option value='false'>Not in stock</option>
          </select>

          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
              <Select
                labelId='demo-multiple-checkbox-label'
                id='demo-multiple-checkbox'
                multiple
                name='labels'
                value={labels}
                onChange={handleChange}
                input={<OutlinedInput label='Tag' />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {toyLabels.map((toyLabel) => (
                  <MenuItem key={toyLabel} value={toyLabel}>
                    <Checkbox checked={labels.indexOf(toyLabel) > -1} />
                    <ListItemText primary={toyLabel} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </form>
    </section>
  )
}
