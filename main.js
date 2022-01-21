document.addEventListener('DOMContentLoaded', function () {

    var suggestionUlElem = document.querySelector('#intelli-vhn-cd-007');
    var topDiv = document.querySelector('.IntelliTextEditor');
    // function cursor_position() {
    //     var sel = document.getSelection();

    //     var pos = sel.toString().length;
    //     if (sel.anchorNode != undefined) sel.collapseToEnd();

    //     return pos;
    // }

    // // Demo:
    // // var elm = document.querySelector('[contenteditable]');
    // topDiv.addEventListener('click', printCaretPosition)
    // topDiv.addEventListener('keydown', printCaretPosition)

    // function printCaretPosition() {
    //     console.log(cursor_position(), 'length:', this.textContent.trim().length)
    // }
    var selectedSpan;



    function handleClickEvent(event) {

        console.dir(event.target);
        if (event.target.className != 'IntelliTextEditor refreshing')
            addRange(event.target);




        // var selection = window.getSelection();

        // console.dir(selection);

        // const node = document.createElement('span');
        // node.textContent = 'HELLO';

        // document.getSelection().anchorNode.appendChild(node)
        // topDiv.replaceChild(node, document.getSelection())


        let targetNode = event.target.nodeName;

        if (targetNode == 'SPAN') {
            selectedSpan = event.target;
            if (event.target.classList.contains('IntelliTextEditor-argument')) {
                displaySuggestion('ARG');
            } else if (event.target.classList.contains('IntelliTextEditor-function')) {
                displaySuggestion('FUNC');
            } else if (event.target.classList.contains('IntelliTextEditor-separator')) {

            }

            // removeAllHighligh();
            // event.target.classList.add('highlight');
        } else {
            selectedSpan = undefined;
            displaySuggestion('*');
        }

    }

    function handleKeyUpEvent(event) {
        if (event.code.toLowerCase() == 'space') {
            const span = document.createElement('span');
            span.textContent = event.key;

            event.parentNode.insertAdjecentHTML('afterend', '<span> </span>')
            // const selection = window.getSelection();
            // console.dir(selection);
            // const range = selection.getRangeAt(0);

            // // range.commonAncestorContainer.firstElementChild.insertNode(span)
            // console.dir(range);
            // range.insertNode(span);
        }

    }

    function handleSuggestionClick(event) {
        var targetLi = event.target.closest('.list');
        if (targetLi.classList.contains('FUNC')) {
            const funcObj = window.FUNCTIONS.find((func) => func.id == targetLi.dataset.id);
            console.log(funcObj);
        } else if (targetLi.classList.contains('ARG')) {
            const attrcObj = window.ATTRIBUTES.find((func) => func.id == targetLi.dataset.id);
            console.log(attrcObj);

            const spanHtml = createAttributeSpan(attrcObj);

            selectedSpan.parentNode.replaceChild(spanHtml, selectedSpan);

            // const divTemp = document.createElement('div');
            // divTemp.innerHTML = attrcObj.value;

            // if (selectedText) {
            //     selectedText.parentNode.replaceChild(divTemp.firstChild, selectedText);
            // }
        }
    }

    function createAttributeSpan(attrcObj) {
        const span = document.createElement('span');
        span.classList.add('IntelliTextEditor-argument');
        span.innerText = attrcObj.syntax;

        return span;
    }

    // /**Handlers */
    topDiv.addEventListener('click', handleClickEvent);
    topDiv.addEventListener('keyup', handleKeyUpEvent);
    suggestionUlElem.addEventListener('click', handleSuggestionClick);




    // const handleKeyboard = (event) => {
    //     // console.log(ctrlKey);
    //     // if (repeat) return
    //     // if ((metaKey || 'Control') && key === ' ') console.log('’Cmd+/’ was pressed')

    //     console.dir(event);
    // }


    // topDiv.addEventListener('keyup', handleKeyboard);


    function getAttriute(text) {
        return `<span class="IntelliTextEditor-target">${text}</span>`;
    }




    function displaySuggestion(type) {
        suggestionUlElem.innerHTML = '';

        if (type == '*') {
            showList(type);
        } else if (type == 'ARG') {
            showList('ARG')
        } else if (type == 'FUNC') {
            showList('FUNC');
        }
    }

    function showList(type) {
        if (type == '*') {
            window.ATTRIBUTES.forEach((func) => {
                suggestionUlElem.insertAdjacentHTML('beforeend', makeLst('ARG', func));
            })
            window.FUNCTIONS.forEach((func) => {
                suggestionUlElem.insertAdjacentHTML('beforeend', makeLst('FUNC', func));
            })
        } else if (type == 'FUNC') {
            window.FUNCTIONS.forEach((func) => {
                suggestionUlElem.insertAdjacentHTML('beforeend', makeLst(type, func));
            })
        } else if (type == 'ARG') {
            window.ATTRIBUTES.forEach((func) => {
                suggestionUlElem.insertAdjacentHTML('beforeend', makeLst(type, func));
            })
        }

    }

    function makeLst(type, obj) {
        return `<li class="list ${type}" data-id="${obj.id}">
                    <span></span>
                    ${obj.syntax}
                </li>`
    }



    /**
     * Helper Method
     */

    function addRange(element) {
        debugger
        let selection = window.getSelection();
        let range = document.createRange();

        if (selection.rangeCount > 0) {
            selection.removeAllRanges();
        }

        range.selectNode(element);
        selection.addRange(range);
    }

    function removeAllHighligh() {
        const allHighlightedElems = document.querySelectorAll('span.highlight');
        allHighlightedElems.forEach(highlightElem => {
            highlightElem.classList.remove('highlight');
        });
    }




    /**
     * Testing::
     */


    // let button = document.querySelector('button');

    // button.addEventListener('click', function () {
    //     debugger
    //     let selection = window.getSelection();
    //     let strongs = document.getElementsByTagName('strong');

    //     if (selection.rangeCount > 0) {
    //         selection.removeAllRanges();
    //     }

    //     for (let i = 0; i < strongs.length; i++) {
    //         let range = document.createRange();
    //         range.selectNode(strongs[i]);
    //         selection.addRange(range);
    //     }
    // });




})