// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    
  }

  
  show(numberCorrect, numberWrong) {
    //结果已经更新了
    //更新百分比
    let c_num = parseInt(document.querySelector('.correct').textContent),
    w_num = parseInt(document.querySelector('.incorrect').textContent);
    let percent = document.querySelector('.percent');
    this.back_menu = document.querySelector('.to_menu');
    this.back_menu.addEventListener('click',this.back_menu_event);
    this.continue = document.querySelector('.continue');
    this.continue.addEventListener('click',this.click_con);
    
    
    if(w_num === 0)
    {//全对了
      this.continue.textContent = 'Start Over?';
    }else
    {
      this.continue.textContent = 'Continue';
    }
    percent.textContent = parseInt((c_num / (w_num+c_num)) * 100);
    this.containerElement.classList.remove('inactive');
  }
  
  back_menu_event()
  {
    document.dispatchEvent(new CustomEvent('back_menu'));
  }

  click_con()
  {
    document.dispatchEvent(new CustomEvent('continue_card'));
  }



  hide() {
    this.containerElement.classList.add('inactive');
  }
}
