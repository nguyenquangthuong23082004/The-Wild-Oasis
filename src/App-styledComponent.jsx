import styled from "styled-components"
import GlobalStyle from "./styles/GlobalStyle"
import Button from "./ui/Button"
import Heading from "./ui/Heading"
import Row from "./ui/Row"

const StyleApp = styled.main`
  background-color: orangered;
  padding: 20px;
`

function App() {

  return (
    <>
    <GlobalStyle />
    <StyleApp>
      <Row type = 'horizontal'>
        <Button variation='primary' size='medium'>Hello world</Button>
        <Button variation='secondary' size='small'>Hello world</Button>
        <Button >Hello world</Button>

      </Row>
      <Row type = 'vertical'>
        <Heading as = "h1">Hello</Heading>
        <Heading as = "h2">Hello</Heading>
      </Row>
    </StyleApp>
    </>
  )
}

export default App


