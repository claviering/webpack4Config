import React from "react"
import { Link } from "react-router-dom"
import List from './List'
import CustomTextInput from './CustomTextInput'
import { Button, Icon } from 'antd'

export interface Props { }

interface State {
  title: string;
}
interface Home {
  myRef: any;
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      title: ''
    };
  }
  componentDidCatch(error: any, info: any) {
    console.log('error', error);
    console.log('info', info);
  }
  componentDidMount() {
    // 调用子组件方法
    this.myRef.current.call()
  }
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    console.log('getDerivedStateFromProps nextProps', nextProps);
    console.log('getDerivedStateFromProps prevState', prevState);
    return nextProps
  }

  render() {
    return (
      <div className="home">
      <h1>Home</h1>
      <h2>button</h2>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="danger">Danger</Button>
      <Icon type="arrow-up" />
      <Icon type="step-backward" />
      <Icon type="fast-backward" />
      <Icon type="check" />
      <List/>
      <CustomTextInput ref={this.myRef}/>
      <nav>
          <ul>
            <li>
              <Link to="/home/about">About</Link>
            </li>
            <li>
              <Link to="/home/user">Users</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default Home;