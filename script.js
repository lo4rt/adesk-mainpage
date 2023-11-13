function collapseList(element) {
  let listHeight = element.scrollHeight;

  // let elementTransition = element.style.transition;
  // element.style.transition = '';

  requestAnimationFrame(function() {
    element.style.height = listHeight + 'px';
    // element.style.transition = elementTransition;

    requestAnimationFrame(function() {
      element.style.height = 0 + 'px';
    });
  });

  element.setAttribute('data-collapsed', 'true');
}

function expandList(element) {
  let listHeight = element.scrollHeight;

  element.style.height = listHeight + 'px';

  element.addEventListener('transitionend', function returnToInitalValue(e) {
    element.removeEventListener('transitionend', returnToInitalValue);
    
    element.style.maxHeight = null;
  });

  element.setAttribute('data-collapsed', 'false');
}

document.querySelectorAll('.collapsible').forEach((column) => {
  let btn = column.querySelector('button');
  let btnImage = btn.querySelector('img');

  btn.addEventListener('click', function(e) {
    let [column, btnImage] = this;
    
    let list = column.querySelector('.column__elements');
    let isCollapsed = list.getAttribute('data-collapsed') === 'true';

    if(isCollapsed) {
      btnImage.classList.add('rotate');
      expandList(list)
    } else {
      btnImage.classList.remove('rotate');
      collapseList(list)
    }
  }.bind([column, btnImage]))

})