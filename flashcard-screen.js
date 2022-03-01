// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    
    this.containerElement = containerElement;

    this.show_res = this.show_res.bind(this);
    this.on_drag_start = this.on_drag_start.bind(this);
    this.on_drag_con = this.on_drag_con.bind(this);
    this.on_drag_end = this.on_drag_end.bind(this);
    this.go_to_next = this.go_to_next.bind(this);
    this.add_drag = this.add_drag.bind(this);
    this.first_show = this.first_show.bind(this);

    this.right_num = 0;
    this.wrong_num = 0;
  }

  show(card_set_index,iscontinual) {



    this.containerElement.classList.remove('inactive');

    if(iscontinual === false)
    {
      document.querySelector('#flashcard-container').innerHTML = '';
      this.wrong_num = 0;
      this.right_num = 0;
      this.first_show(card_set_index);
    }else
    {
      //继续错误的归0
      if(this.wrong_num !== 0)
      {
        this.wrong_num = 0;
        this.key_length = this.key.length;
        this.show_res();
        this.go_to_next();
      }else{
        document.querySelector('#flashcard-container').innerHTML = '';
        this.wrong_num = 0;
        this.right_num = 0;
        this.first_show(this.card_set_index);
      }
    }


  }
  


  first_show(card_set_index)
  {
    this.card_set_index = card_set_index;
    const flashcardContainer = document.querySelector('#flashcard-container');
    this.flashcardContainer = flashcardContainer;
    //记录本次的单词集合
    this.words = FLASHCARD_DECKS[this.card_set_index]['words'];
    this.key = Object.keys(this.words);
    this.key_length = this.key.length;
    this.cur_card_index = 0;
    this.card = new Flashcard(flashcardContainer, this.key[this.cur_card_index], 
    this.words[this.key[this.cur_card_index]]);

    this.add_drag();
    this.show_res();
  }

  add_drag()
  {
    let flashcard_item = this.flashcardContainer.firstChild;

    this.draging = false;
    //给这个物体加上拖动事件
    flashcard_item.addEventListener('pointerdown',this.on_drag_start);
    flashcard_item.addEventListener('pointermove',this.on_drag_con);
    flashcard_item.addEventListener('pointerup',this.on_drag_end);
    flashcard_item.addEventListener('pointercancel',this.on_drag_end);
  }

  //展刷新数量
  show_res()
  {
    let correct = document.querySelectorAll('.correct');
    let incorrect = document.querySelectorAll('.incorrect');
    for(let elem of correct)
    {
      elem.textContent = this.right_num;
    }
    for(let elem of incorrect)
    {
      elem.textContent = this.wrong_num;
    }
  }



  //切换下一个卡片；
  go_to_next()
  {
    
    
    ++this.cur_card_index;
    //这个key_length 记录的事过去·的长度，继续只要更新这个值就行了
    if(this.cur_card_index === this.key_length)
    {
      /************************结束了 */
      document.dispatchEvent(new CustomEvent('change_to_res'));
      --this.cur_card_index;
      return;
    }
    this.card.word.textContent = this.key[this.cur_card_index];
    this.card.def.textContent = this.words[this.card.word.textContent];
    if(this.card.wordshow === false)
    {
      this.card._flipCard();
    }
    document.querySelector('.flashcard.word').classList.add('grow_item');
    
  }

  on_drag_start(event)
  {
    event.preventDefault();
    this.draging = true;
    this.originX = event.clientX;
    //开始点击
    event.currentTarget.setPointerCapture(event.pointerId);
    
  }

  on_drag_con(event)
  { 
    if(this.draging)
    {
      let currentX = event.clientX;
      let offsetX = currentX - this.originX;
      this.offsetx = offsetX;
      console.log('offsetX:'+offsetX);
      let tem = Math.abs(this.offsetx);
      console.log('tem:'+tem)
      if( tem >= 150)
      {//对的增加
        this.body = document.querySelector('body');
        this.body.style.backgroundColor = "#97b7b7";

      }else{
        //需要手机错误的卡片。

        this.body = document.querySelector('body');
        this.body.style.backgroundColor = "#d0e6df";
      }
      //直线移动+旋转
      this.flashcardContainer.style.transform 
      = 'translate(' + offsetX + 'px,-'+ 0.25*Math.abs(offsetX) +'px) '+ 
      'rotate('+ 0.2 * offsetX +'deg)';

      event.currentTarget.setPointerCapture(event.pointerId);

    }
  }

  on_drag_end(event)
  {
    //TODO
    this.draging = false;
    this.flashcardContainer.style.transform = '';

    if(Math.abs(this.offsetx) > 150)
    {
      if(this.offsetx > 0)
      {
        ++this.right_num;
      }else{
        ++this.wrong_num;
        //将错误加入尾端；
        this.key.push(this.key[this.cur_card_index]);
      }
      this.show_res();
      this.go_to_next();
      this.offsetx = 0;
    }

    this.body.style.backgroundColor = "#d0e6df";
    
  }

  //某个元素里面的值=1；

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
