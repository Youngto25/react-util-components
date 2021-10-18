# React 图片动画帧效果

## 使用
```
import AnimatedImage from './components/AnimatedImage';

function App() {
  return (
    <div className="App">
      <AnimatedImage images={new Array(21).fill(0).map((v, i) => `./assets/loading/loading_${('000' + i).slice(-3)}.png`)} style={{width: '100px',objectFit: 'contain',transform: 'rotate(-90deg)'}} />
    </div>
  );
}
```
