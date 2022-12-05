import { useState, useEffect } from 'react'
import { DefineAttribute } from './DefineAttribute/index.jsx'
import { FormStyle, Content, Button } from './styles'
import { hook } from './hook'
import { OnError } from '../OnError'
import { OnLoading } from '../OnLoading'

export function DefineSchema({
  title = 'Define Schema',
  baseSchema,
  nonOptionals,
  onClickHandler,
  buttons = ['add', 'save'],
  highOrderCallback,
}) {
  const {
    attributes,
    onClick,
    listOfDefineAttributes,
    setAttributes,
    schema,
    setSchema,
    label,
    setLabel,
    loading,
    error,
    reset,
  } = hook({ baseSchema, onClickHandler, highOrderCallback })

  // console.log({baseSchema})

  return (
    <Content>
      <h2>{title}</h2>
      <label hidden={true}>Label:</label>
      <input
        hidden={true}
        type="text"
        name="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <FormStyle>
        {new Map(Object.entries(attributes)).forEach((_, index) => {
          listOfDefineAttributes.push(
            <DefineAttribute
              {...{
                key: index,
                index,
                schema,
                setSchema,
                attributes,
                setAttributes,
                nonOptionals,
              }}
            />,
          )
        })}
        {listOfDefineAttributes}
      </FormStyle>
      {buttons.includes('add') && (
        <Button name="add-button" type="button" onClick={onClick}>
          Add
        </Button>
      )}
      <OnError {...{ error, reset }}></OnError>
      <OnLoading {...{ loading, component: Content }}></OnLoading>
      {buttons.includes('save') && (
        <Button name="save-button" type="button" onClick={onClick}>
          Save
        </Button>
      )}
    </Content>
  )
}
