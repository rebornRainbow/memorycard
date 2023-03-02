

class MenuScreen {
  constructor(containerElement) {
    this.add_title = this.add_title.bind(this);
    this.containerElement = containerElement;
    this.add_title();
  }

  //加上标题选项
  add_title()
  {
    let choices = document.querySelector('#choices');

    let i = 0;

    for(let elem of FLASHCARD_DECKS)
    {
      let tem_title = document.createElement('div');
      tem_title.dataset.index = i++;
      tem_title.innerText = elem['title'];
      choices.appendChild(tem_title);
    }
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
