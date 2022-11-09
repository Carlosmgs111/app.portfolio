import styled from 'styled-components'

export const Sidebar = styled.div`
  display: flex;
  border-radius: 0 0.6rem 0.6rem 0;
  background-color: rgba(0, 0, 0, 0.5);
  max-height: 70vh;
  position: fixed;
  top: 10vh;
  left: 0;
  min-width: 30px;
  padding: 1.8rem;
  font-size: 2.4rem;
  justify-content: center;
  align-items: center;
  color: hsl(19, 97%, 51%);
  .sidebar-button {
    margin-bottom: 0.8rem;
  }
`
