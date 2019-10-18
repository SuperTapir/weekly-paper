import React from 'react';
import { Typography, Input, Button, Icon } from 'antd';
import styles from './index.module.css';
import { copy2ClipBoard, savePaperData2Storage, getPaperData2Storage } from '../../utils/index';
const { Title } = Typography;

interface IProps {
  size?: string;
}
interface IState {
  title: string;
  paperData: any[];
}

class WeeklyPaperTemplate extends React.Component<IProps, IState> {
  state = {
    title: '本周工作',
    paperData: [
      {
        topic: '数据分析',
        items: ['text', 'text2'],
      },
      {
        topic: 'Topic2',
        items: ['text', 'text2', 'text3', 'text4', 'text5'],
      },
    ],
  };

  componentDidMount() {
    let temp = getPaperData2Storage();
    if (Object.keys(temp).length !== 0) {
      this.setState(temp);
    }
  }

  handleTitleChange = (str: string) => {
    console.log('Content change:', str);
    this.setState({ title: str });
  };

  handleTopicChange = (str: string, index: number, itemIndex?: number) => {
    this.setState(prevState => {
      let temp = prevState.paperData;

      if (itemIndex !== undefined) {
        temp[index].items[itemIndex] = str;
      } else {
        temp[index].topic = str;
      }
      let state = {
        ...prevState,
        paperData: temp,
      };
      savePaperData2Storage(state);
      return state;
    });
  };

  handleDeleteTopic = (index: number, itemIndex?: number) => {
    this.setState(prevState => {
      let temp = prevState.paperData;

      if (itemIndex !== undefined) {
        temp[index].items.splice(itemIndex, 1);
        if (temp[index].items.length === 0) {
          temp.splice(index, 1);
        }
      } else {
        temp.splice(index, 1);
      }

      return {
        ...prevState,
        paperData: temp,
      };
    });
  };

  addTopic = () => {
    this.setState(prevState => {
      let temp = prevState;
      temp.paperData.push({
        topic: '',
        items: [''],
      });
      return temp;
    });
  };

  handleItemInputEndter = (topicIndex: number, itemIndex: number) => {
    console.log('ENTER');
    this.setState(prevState => {
      let temp = prevState.paperData;

      if (itemIndex !== undefined) {
        temp[topicIndex].items.splice(itemIndex, 0, '');
      }
      return {
        ...prevState,
        paperData: temp,
      };
    });
  };

  handleSubmit = () => {
    const { title, paperData } = this.state;
    let result = '';
    function addNewLine(str: string = '') {
      result += str + '\n';
    }
    function genTabText(str: string, tabNum: number) {
      let temp = '';
      for (let i = 0; i < tabNum; i++) {
        temp += '\t';
      }
      return temp + str;
    }
    addNewLine(title);
    addNewLine();
    paperData.forEach(({ topic, items }) => {
      addNewLine(genTabText(topic + ':', 1));
      addNewLine();
      items.forEach((item, index) => {
        addNewLine(genTabText(`${index + 1}. ${item}`, 2));
      });
      addNewLine();
    });
    copy2ClipBoard(result);
  };

  render() {
    const { paperData } = this.state;
    return (
      <div className={styles.container}>
        <Title editable={{ onChange: this.handleTitleChange }}>{this.state.title}</Title>
        {paperData.map(({ topic, items }, index) => (
          <div className={styles.topicBlock} key={index}>
            <Input
              size="large"
              placeholder="New Topic"
              value={topic}
              onChange={e => this.handleTopicChange(e.target.value, index)}
              addonAfter={<Icon type="delete" theme="filled" className={styles.deleteIcon} onClick={() => this.handleDeleteTopic(index)} />}
            />
            <ol className={styles.itemList}>
              {items &&
                items.map((v, itemIndex) => (
                  <li className={styles.item} key={itemIndex}>
                    <Input
                      size="default"
                      placeholder="New Item"
                      value={v}
                      onPressEnter={e => this.handleItemInputEndter(index, itemIndex)}
                      onChange={e => this.handleTopicChange(e.target.value, index, itemIndex)}
                      addonAfter={
                        <Icon
                          type="delete"
                          theme="filled"
                          className={styles.deleteIcon}
                          onClick={() => this.handleDeleteTopic(index, itemIndex)}
                        />
                      }
                    />
                  </li>
                ))}
            </ol>
          </div>
        ))}
        <Button type="dashed" size="large" onClick={this.addTopic} block>
          <Icon type="plus" /> Add Topic
        </Button>
        <Button type="primary" size="large" onClick={() => this.handleSubmit()} className={styles.submitBtn}>
          完成
        </Button>
      </div>
    );
  }
}

export default WeeklyPaperTemplate;
