document.addEventListener('DOMContentLoaded', function () {

    const DEFINITION = {
        'ARGUMENT': 0,
        'FUNCTION': 1,
        'SEPARATOR': 2
    }

    const HTMLCLASSCONSTANTS = {
        'IntelliTextEditor-argument': DEFINITION.ARGUMENT,
        'IntelliTextEditor-function': DEFINITION.FUNCTION,
        'IntelliTextEditor-separator': DEFINITION.SEPARATOR
    }

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
    var target;



    function handleClickEvent(event) {
        // target = event.target;

        console.dir(event.target);

        // Can add if not selected near closing bracket otherwise hole funtion get selected
        if (event.target.className != 'IntelliTextEditor refreshing')
            addRange(event.target);

        // var selection = window.getSelection();

        // console.dir(selection);

        // const node = document.createElement('span');
        // node.textContent = 'HELLO';

        // document.getSelection().anchorNode.appendChild(node)
        // topDiv.replaceChild(node, document.getSelection())


        let className = event.target.className;

        if (HTMLCLASSCONSTANTS.hasOwnProperty(className)) {
            className = HTMLCLASSCONSTANTS[className];
            let targetNode = event.target.nodeName;

            if (targetNode == 'SPAN') {
                selectedSpan = event.target;
                if (className == DEFINITION.ARGUMENT) {
                    displaySuggestion('*'); // ARG
                } else if (className == DEFINITION.FUNCTION) { // FUNC
                    displaySuggestion('*');
                } else if (className == DEFINITION.SEPARATOR) {

                }

                // removeAllHighligh();
                // event.target.classList.add('highlight');
            } else {
                selectedSpan = undefined;
                displaySuggestion('*');
            }

        }




    }

    function handleKeyUpEvent(event) {
        const selection = window.getSelection();
        console.log(selection.anchorNode);

        if (event.code.toLowerCase() == 'space') {

            displaySuggestion('*');

            // const span = document.createElement('span');
            // span.textContent = event.key;

            // event.parentNode.insertAdjecentHTML('afterend', '<span> </span>')
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
        var selectedOption = null;
        if (targetLi.classList.contains('FUNC')) {
            selectedOption = window.FUNCTIONS.find((func) => func.id == targetLi.dataset.id);
        } else if (targetLi.classList.contains('ARG')) {
            selectedOption = window.ATTRIBUTES.find((func) => func.id == targetLi.dataset.id);
        }

        let dummyTag = createDummyTag(selectedOption.innerHTML);

        if (selectedSpan) {
            try {
                selectedSpan.parentNode.replaceChild(dummyTag.firstChild, selectedSpan);
            } catch (error) {
                if (error instanceof DOMException) {
                    console.log('NOT FOUND ERROR');
                }
            } finally {
                selectedSpan = null;
                return;
            }

        }

        if (topDiv) {
            topDiv.appendChild(dummyTag.firstChild);
            return;
        }
    }

    function createDummyTag(value) {
        const div = document.createElement('div');
        div.innerHTML = value;
        return div;
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
            window.FUNCTIONS.forEach((func) => {
                suggestionUlElem.insertAdjacentHTML('beforeend', makeLst('FUNC', func));
            })

            window.ATTRIBUTES.forEach((func) => {
                suggestionUlElem.insertAdjacentHTML('beforeend', makeLst('ARG', func));
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


    function createAttributeSpan(attrcObj) {
        const span = document.createElement('span');
        span.classList.add('IntelliTextEditor-argument');
        span.innerText = attrcObj.syntax;

        return span;
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