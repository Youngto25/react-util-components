/*
 * @Author: YangTao
 * @Date: 2021-08-23 18:56:16
 * @LastEditTime: 2021-08-23 19:44:58
 * @LastEditors: YangTao
 * @Description: 
 * @FilePath: \react-util-components\src\App.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import './App.css';
import AnimatedImage from './components/AnimatedImage';

function App() {
  return (
    <div className="App">
      <AnimatedImage images={new Array(21).fill(0).map((v, i) => `./assets/loading/loading_${('000' + i).slice(-3)}.png`)} style={{width: '100px',objectFit: 'contain',transform: 'rotate(-90deg)'}} />
    </div>
  );
}

export default App;
