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
    this.continue = document.querySelector('.continue');
    this.continue.addEventListener('click',this.click_con);
  }


  click_con()
  {
    document.dispatchEvent(new CustomEvent('continue_card'));
  }

  show(numberCorrect, numberWrong) {
    //结果已经更新了
    //更新百分比
    let c_num = parseInt(document.querySelector('.correct').textContent),
    w_num = parseInt(document.querySelector('.incorrect').textContent);
    let percent = document.querySelector('.percent');
    percent.textContent = parseInt((c_num / (w_num+c_num)) * 100);
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
