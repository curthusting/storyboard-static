$(function(){
   $("a.embed").oembed();
});

var img = document.getElementById('coverImg');
$(function() {
    var vibrant = new Vibrant(img);
    // console.info(vibrant.swatch(), 'info')
    var swatches = vibrant.swatches()
    for (var swatch in swatches) {
        var containers = document.querySelectorAll('.color'+swatch);
        for (var i = containers.length - 1; i >= 0; i--) {
            // reset
            containers[i].style.backgroundColor = containers[i].style.color = containers[i].innerHTML = null;

            if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                containers[i].style.backgroundColor = 'rgba('+swatches[swatch].getRgb()[0]+','+swatches[swatch].getRgb()[1]+','+swatches[swatch].getRgb()[2]+',0.6)'
                containers[i].style.color = swatches[swatch].getTitleTextColor()

                containers[i].innerHTML = '&nbsp;';
            };
        }
    }

})
img.addEventListener('load', function() {
    var vibrant = new Vibrant(img);
    // console.info(vibrant.swatch(), 'info')
    var swatches = vibrant.swatches()
    for (var swatch in swatches) {
        var containers = document.querySelectorAll('.color'+swatch);
        for (var i = containers.length - 1; i >= 0; i--) {
            // reset
            containers[i].style.backgroundColor = containers[i].style.color = containers[i].innerHTML = null;

            if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                containers[i].style.backgroundColor = 'rgba('+swatches[swatch].getRgb()[0]+','+swatches[swatch].getRgb()[1]+','+swatches[swatch].getRgb()[2]+',0.6)'
                containers[i].style.color = swatches[swatch].getTitleTextColor()

                containers[i].innerHTML = '&nbsp;';
            };
        }
    }

    /*
     * Results into:
     * Vibrant #7a4426
     * Muted #7b9eae
     * DarkVibrant #348945
     * DarkMuted #141414
     * LightVibrant #f3ccb4
     */
});

$('.split').on('click', function() {
    $('.cover').toggleClass('split')
})

// $('.color-picker').colorPicker();
var stylesheet = document.createElement('style');
document.body.appendChild(stylesheet);

$(document).on('click', '.swatch:not(.custom)', function() {
    var $el = $(this);
    // $el.parents('.copy').find('.color').css({
    //     backgroundColor: $el.css('background-color'),
    //     color: $el.css('color')
    // });


    var colorString = $el.css('background-color'),
    colorsOnly = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/),
    red = colorsOnly[0],
    green = colorsOnly[1],
    blue = colorsOnly[2];
    opacity = colorsOnly[3];
    var color = '#000';
    if ((red * 299 + green * 587 + blue * 114) / 1000 < 200) {
        color = '#fff'
    }

    $('.cover .copy').find('.color').css({
        backgroundColor: 'rgba('+red+','+green+','+blue+','+opacity+')',
        color: color
    });


    $('#accentColor').val($el.css('background-color'));
    $('#accentColor').minicolors('value', { color: 'rgb('+red+', '+green+', '+blue+', '+opacity+')', opacity: opacity });

    var background = '.progress, .cover { background-color: rgb('+red+','+green+','+blue+');}';

    if (255 == red && 255 == green && 255 == blue) {
        red = green = blue = 0;
    }

    stylesheet.innerHTML = '.color, h2, .dropcaps:first-letter { color: rgb('+red+','+green+','+blue+');}'+ background;

})

function update(color) {
    console.info(color, 'update')
    var colorString = color,
    colorsOnly = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/),
    red = colorsOnly[0],
    green = colorsOnly[1],
    blue = colorsOnly[2],
    opacity = colorsOnly[3];
    // console.info(red+','+green+','+blue+','+opacity, 'color')
    console.info((red * 299 + green * 587 + blue * 114) / 1000);
    var color = '#000';
    if ((red * 299 + green * 587 + blue * 114) / 1000 < 200) {
        color = '#fff'
    }

    $('.cover .copy').find('.color').css({
        backgroundColor: 'rgba('+red+','+green+','+blue+','+opacity+')',
        color: color
    });

    // if (colorsOnly) {
    var background = '.progress, .cover { background-color: rgb('+red+','+green+','+blue+');}';

    if (255 == red && 255 == green && 255 == blue) {
        red = green = blue = 0;
    }

    stylesheet.innerHTML = 'h2, .dropcaps:first-letter { color: rgb('+red+','+green+','+blue+');}'+ background;
    // } else {
    //     var background = '.progress, .cover { background-color: #'+colorString+';}';
    //     stylesheet.innerHTML = 'h2, .dropcaps:first-letter { color: #'+colorString+';}'+ background;
    // }
    // $(this).parent('.swatch').css({
    //     backgroundColor: $(this).val(),
    //     color: '#fff'
    // });
    // $(this).parent('.swatch').find('input').css({
    //     backgroundColor: $(this).val(),
    //     color: '#fff'
    // });
}

$(function() {
    var CustomPasteHandler = MediumEditor.extensions.paste.extend({
        cleanPastedHTML: true,
        handlePaste: function(event) {
            // console.log(event);
            if (isFilePaste(event)) {
                handleFilePaste($(this.base.elements[0]).attr('tm_id'), event);
                return;
            }
            // If it's not a file paste, fallback to the default paste handler logic
            // console.log('default methode from context-menu');
            MediumEditor.extensions.paste.prototype.handlePaste.apply(this, arguments);
        },
        handlePasteBinPaste: function(event) {
            // console.log(event);
            if (isFilePaste(event)) {
                this.removePasteBin();
                handleFilePaste($(this.base.elements[0]).attr('tm_id'), event);
                return;
            }
            // If it's not a file paste, fallback to the default paste handler logic
            // console.log('default method from ctr+v');
            MediumEditor.extensions.paste.prototype.handlePaste.apply(this, arguments);
        }
    });

    var options = {
        toolbar: {
            /* These are the default options for the toolbar,
               if nothing is passed this is what is used */
            allowMultiParagraphSelection: true,
            buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 'strikethrough', 'subscript', 'superscript', 'quote', 'orderedlist', 'unorderedlist', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            diffLeft: 0,
            diffTop: -10,
            firstButtonClass: 'medium-editor-button-first',
            lastButtonClass: 'medium-editor-button-last',
            relativeContainer: null,
            standardizeSelectionStart: false,
            static: false,
            /* options which only apply when static is true */
            align: 'center',
            sticky: false,
            updateOnEmptySelection: false
        },
        extensions: {
            'paste': new CustomPasteHandler()
        },
        paste: {
            forcePlainText: true,
            cleanPastedHTML: false
        },
        autoLink: true,
        placeholder: false,
        activeButtonClass: 'medium-editor-button-active',
        allowMultiParagraphSelection: true,
        buttonLabels: false,
        contentWindow: window,

        delay: 0,
        disableReturn: true,
        disableDoubleReturn: true, //
        disableExtraSpaces: true, //
        disableEditing: false,
        elementsContainer: false,
        extensions: {},
        ownerDocument: document,
        spellcheck: true,
        targetBlank: true //
    };
    $('.is-editable').on('click', function() {
        $(this).attr('contenteditable', true);
        $(this).focus();
    })
    $('.is-editable').on('focus', function() {
        // alert('here')
    })

    $(document).on('hover', '.cover-wrap', function() {
        $(this).find('.overlay').show();
    })

    $(document).on('click', '.overlay button', function() {
        var target = $(this).parents('.cover-wrap').find('.copy');
        setTitlePosition(target, $(this).data());
    })

    function setTitlePosition(target, data) {
        target.removeClass('top middle bottom left center right').addClass(data.v).addClass(data.h);
    }

    $('.position').on('click', function() {
        $(this).toggleClass('moving');
        $('.overlay').toggleClass('hide');
    })

    function updatePlaceholder() {
        $('.placeholder').remove();

        $('.section:not(.cover)').each(function(index, $el) {

            var placeholder = $('<div class="placeholder"><i  data-lz-type="text" class="insert ion-plus-circled"></i><span class="type"><i data-lz-type="text" class="insert ion-compose"></i><i data-lz-type="grid flex-images" class="insert ion-grid"></i><i data-lz-type="image" class="insert ion-images"></i><i data-lz-type="video" class="insert ion-play"></i><i data-lz-type="audio" class="insert ion-music-note"></i></span></div>').insertAfter($el);

            $(placeholder).on('click', '.insert', function(el) {
                var $el = $(this);
                // $('.sidebar').addClass('show')
                // console.info($el.data(), $el.data('lsType'), 'insert')
                insertSection($el.parents('.placeholder').prev('.section'), $el.data('lzType'));

            })
        })
    }
    updatePlaceholder();

    $('.section.grid').on('resize', function() {
        // console.info($(this).height())
    })

    function insertSection($el, type, data) {
        // var sectionType =
        var section = $('<div class="is-editable wysiwyg section ' + type + '" data-row-height="600" data-lz-type="' + type + '" data-disable-return="true" data-placeholder="..." contenteditable tabindex=""></div>')
        if (!$el.hasClass('section') && !$el.hasClass('placeholder')) {
            $el = $el.parents('.section');
        }

        if ('text' === type) {
            section = $('<div class="is-editable wysiwyg section ' + type + '" data-row-height="600" data-lz-type="' + type + '" data-disable-return="true" data-placeholder="..." contenteditable tabindex=""></div>')
        }
        if ('video' === type) {
            section = $('<div class="is-editable section ' + type + '" data-row-height="600" data-lz-type="' + type + '" data-disable-return="true" data-placeholder="Paste YouTube or Vimeo embed url" contenteditable tabindex=""></div>')
        }
        if ('audio' === type) {
            section = $('<div class="is-editable section ' + type + '" data-row-height="600" data-lz-type="' + type + '" data-disable-return="true" data-placeholder="Paste SoundCloud embed url" contenteditable tabindex=""></div>')
        }

        // section = $('<div class="is-editable wysiwyg section ' + type + '" data-row-height="600" data-lz-type="' + type + '" data-disable-return="true" data-placeholder="I am a new section" contenteditable tabindex=""></div>')
        section.html(data);
        section.insertAfter($el).focus();
        // console.info(options, 'medium options')
        var editor = new MediumEditor('.wysiwyg', options);

        $('.section.grid').flexImages({
            rowHeight: 300
        });


        // function handlepaste (e) {
        //     var types, pastedData, savedContent;

        //     // Browsers that support the 'text/html' type in the Clipboard API (Chrome, Firefox 22+)
        //     if (e && e.clipboardData && e.clipboardData.types && e.clipboardData.getData) {

        //         // Check for 'text/html' in types list. See abligh's answer below for deatils on
        //         // why the DOMStringList bit is needed. We cannot fall back to 'text/plain' as
        //         // Safari/Edge don't advertise HTML data even if it is available
        //         types = e.clipboardData.types;
        //         if (((types instanceof DOMStringList) && types.contains("text/html")) || (types.indexOf && types.indexOf('text/html') !== -1)) {

        //             // Extract data and pass it to callback
        //             pastedData = e.clipboardData.getData('text/html');
        //             processPaste(editableDiv, pastedData);

        //             // Stop the data from actually being pasted
        //             e.stopPropagation();
        //             e.preventDefault();
        //             return false;
        //         }
        //     }

        //     // Everything else: Move existing element contents to a DocumentFragment for safekeeping
        //     savedContent = document.createDocumentFragment();
        //     while(editableDiv.childNodes.length > 0) {
        //         savedContent.appendChild(editableDiv.childNodes[0]);
        //     }

        //     // Then wait for browser to paste content into it and cleanup
        //     waitForPastedData(editableDiv, savedContent);
        //     return true;
        // }

        // function waitForPastedData (elem, savedContent) {

        //     // If data has been processes by browser, process it
        //     if (elem.childNodes && elem.childNodes.length > 0) {

        //         // Retrieve pasted content via innerHTML
        //         // (Alternatively loop through elem.childNodes or elem.getElementsByTagName here)
        //         var pastedData = elem.innerHTML;

        //         // Restore saved content
        //         elem.innerHTML = "";
        //         elem.appendChild(savedContent);

        //         // Call callback
        //         processPaste(elem, pastedData);
        //     }

        //     // Else wait 20ms and try again
        //     else {
        //         setTimeout(function () {
        //             waitForPastedData(elem, savedContent)
        //         }, 20);
        //     }
        // }

        // function processPaste (elem, pastedData) {
        //     // Do whatever with gathered data;
        //     alert(pastedData);
        //     elem.focus();
        // }

        function cleanTags(str, allowed_tags) {
            // Strips HTML and PHP tags from a string
            var key = '',
                allowed = false;
            var matches = [];
            var allowed_array = [];
            var allowed_tag = '';
            var i = 0;
            var k = '';
            var html = '';

            var replacer = function(search, replace, str) {
                return str.split(search).join(replace);
            };
            // Build allowed tags array
            if (allowed_tags) {
                allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);
            }
            str += '';

            // Match tags
            matches = str.match(/(<\/?[\S][^>]*>)/gi);
            // Go through all HTML tags
            for (key in matches) {
                if (isNaN(key)) {
                    // IE7 Hack
                    continue;
                }

                // Save HTML tag
                html = matches[key].toString();
                // Is tag not in allowed list? Remove from str!
                allowed = false;

                // Go through all allowed tags
                for (k in allowed_array) { // Init
                    allowed_tag = allowed_array[k];
                    i = -1;

                    if (i != 0) {
                        i = html.toLowerCase().indexOf('<' + allowed_tag + '>');
                    }
                    if (i != 0) {
                        i = html.toLowerCase().indexOf('<' + allowed_tag + ' ');
                    }
                    if (i != 0) {
                        i = html.toLowerCase().indexOf('</' + allowed_tag);
                    }

                    // Determine
                    if (i == 0) {
                        allowed = true;
                        break;
                    }
                }
                if (!allowed) {
                    str = replacer(html, "", str); // Custom replace. No regexing
                }
            }

            // remove attributes ' style="..."'
            var badAttributes = ['style', 'dir', 'class', 'id'];
            for (var i = 0; i < badAttributes.length; i++) {
                var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"', 'gi');
                str = str.replace(attributeStripper, '');
            }
            return str;
        }

        function cleanHTML(input) {
            // replace unsupported h tags
            input = input.replace(/<h[1-2 4-5]/gi, '<h3');
            input = input.replace(/<\/h[1-2 4-5]/gi, '</h3');

            // I hate word - clean paste from word
            // http://patisserie.keensoftware.com/en/pages/remove-word-formatting-from-rich-text-editor-with-javascript
            // 1. remove line breaks / Mso classes
            var stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
            var output = input.replace(stringStripper, ' ');
            // 2. strip Word generated HTML comments
            // var commentSripper = new RegExp('<!--(.*?)-->', 'g');
            // var output = output.replace(commentSripper, '');
            var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|w:|font)(.*?)>', 'gi');
            // 3. remove tags leave content if any
            output = output.replace(tagStripper, '');
            // 4. Remove everything in between and including tags '<style(.)style(.)>'
            var badTags = ['style', 'script', 'applet', 'embed', 'noframes', 'noscript'];

            for (var i = 0; i < badTags.length; i++) {
                tagStripper = new RegExp('<' + badTags[i] + '.*?' + badTags[i] + '(.*?)>', 'gi');
                output = output.replace(tagStripper, '');
            }
            // 5. remove attributes ' style="..."'
            var badAttributes = ['style', 'start'];
            for (var i = 0; i < badAttributes.length; i++) {
                var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"', 'gi');
                output = output.replace(attributeStripper, '');
            }

            output = output.replace(/<br>/gi, '');
            output = output.replace('  ', ' ');
            output = output.replace('&nbsp;&nbsp;', '&nbsp;');
            output = output.replace('&nbsp;', ' ');

            // replace non-supported tags
            output = cleanTags(output, '<p><strong><sup><sub><em><u><i><br><ul><ol><dl><dd><dt><li><h3><h6><a><iframe><aside><img>');

            output = output.replace(/<p><\/p>/gi, '');

            return output;
        }

        function isHTML(str) {
            var a = document.createElement('div');
            a.innerHTML = str;
            for (var c = a.childNodes, i = c.length; i--;) {
                if (c[i].nodeType == 1) return true;
            }
            return false;
        }

        editor.subscribe('editablePaste', function(event, element) {

            // console.info(handlepaste(event));

            var clipboardData, pastedData;

            // Stop data actually being pasted into div
            event.stopPropagation();
            event.preventDefault();

            // Get pasted data via clipboard API
            clipboardData = event.clipboardData || window.clipboardData;
            pastedData = clipboardData.getData('text/html');
            // console.info(typeof pasteData, 'typeOfCheck')
            // console.info(pastedData, 'paste')
            // console.info(cleanHTML(pastedData), 'cleanHTML');

            var cleaned = cleanHTML(pastedData);

            if (isHTML(cleaned)) {
                var $paste = $(cleaned);
            } else {
                var $paste = $('<p>');
                $paste.text(cleaned)
            }
            // console.warn($paste, '$paste')

            var output = []
            var $el = $('.section.active');

            for (var i = $paste.length - 1; i >= 0; i--) {
                // console.info($paste[i])
                insertSection($el, 'text', $paste[i]);
                // console.info($paste[i])
                // output.push($paste[i].wrap('<'))
            };
            $el.remove();
            // console.info(output)

            // $('.section.active').after(output);

            // // Do whatever with pasteddata
            // console.info($paste);
        })

        var singleEnter = false;

        editor.subscribe("editableKeypress", function(event, element) {
            console.info(event, 'keypress')
            singleEnter = false;
        })
        editor.subscribe("editableKeydownEnter", function(event, element) {
            // console.info(singleEnter, 'singleEnter')
            var node = MediumEditor.selection.getSelectionStart(editor.options.ownerDocument);

            console.info(singleEnter, 'Enter')
            // console.info(node, $(node))
            /*if (!singleEnter) {
                var br = document.createElement('br');
                singleEnter = true;
                insertNodeAfterCaret(br, node);
                return true;
            }*/
            // if ('LI' == $(node).context.nodeName) continue;
            // var textRange = document.selection.createRange();

            if ($(node).context.nodeName.toLowerCase() === 'li') {
                var li = document.createElement('li');

                insertNodeAfterCaret(li, node);

                // node.parentNode.insertBefore(li, node.nextSibling);

                // setTimeout(function() {
                //     $(li).focus();
                //     // $(li).select();
                // }, 0)

                // insertNodeAfterCaret(li)
                return true;
            }
            event.preventDefault();

            insertSection($(node), 'text');
        }.bind(event))
        setTimeout(function() {
            updatePlaceholder();
        }, 0)

    }

    function insertNodeAfterCaret(node, target) {
        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            if (sel.rangeCount) {
                var range = sel.getRangeAt(0);
                range.collapse(false);
                target.parentNode.insertBefore(node, target.nextSibling);
                range = range.cloneRange();
                range.selectNodeContents(node);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }

    function insertNodeAtCaret(node) {
        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            if (sel.rangeCount) {
                var range = sel.getRangeAt(0);
                range.collapse(false);
                range.insertNode(node);
                range = range.cloneRange();
                range.selectNodeContents(node);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
            var html = (node.nodeType == 1) ? node.outerHTML : node.data;
            var id = "marker_" + ("" + Math.random()).slice(2);
            html += '<span id="' + id + '"></span>';
            var textRange = document.selection.createRange();
            textRange.collapse(false);
            textRange.pasteHTML(html);
            var markerSpan = document.getElementById(id);
            textRange.moveToElementText(markerSpan);
            textRange.select();
            markerSpan.parentNode.removeChild(markerSpan);
        }
    }

    var editor = new MediumEditor('.wysiwyg', options);



    editor.subscribe('editablePaste', function(event, element) {
        alert('paste')
    })

    editor.subscribe("editableKeydownEnter", function(event, element) {
        event.preventDefault();

        var node = MediumEditor.selection.getSelectionStart(editor.options.ownerDocument);
        insertSection($(node), 'text');
    }.bind(event))

    var fileInput = $('#filesToUpload');
    var imageEmbed = $('#imageEmbed');

    //      function createImage( file )
    //  {
    //      var image = $( 'img' );
    //      var reader = new FileReader();

    //         //       var imageData = new Image();
    //         //       imageData.src = image.attr( "src" );
    //         // var imageType = /image.*/;
    //         // console.log( imageData, imageData.type, 'type' );
    //         // if ( !imageData.type.match( imageType ) )
    //         // {
    //         //  alert( 'unsupported format supplied' );
    //         //  return;
    //         // }

    //      reader.onload = function ( e )
    //      {
    //          image.attr( 'src', e.target.result );
    //          image.attr( 'id', 'crop-' + file.name );
    //          form.attr( 'id', 'form-' + file.name );
    //      };

    //      reader.readAsDataURL( file );

    //         $('.cover').prependTo( fileDisplayArea );

    //  }

    //  fileInput.on( 'change', function ( e )
    //  {
    //      var files = fileInput[ 0 ].files;

    //      for ( var i = 0; i < files.length; i++ )
    //      {
    //          var file = files[ i ];
    //          createImage( file );
    //      }
    //  } );

    function encodeImageFileAsURL(cb) {
        return function() {
            var file = this.files[0];
            // console.info(file, 'file');
            var reader = new FileReader();
            reader.onloadend = function() {
                // console.info(reader.result, 'result')
                cb(reader.result);
            }
            // console.info(reader, 'reader')
            reader.readAsDataURL(file);
        }
    }
    fileInput.on('change', encodeImageFileAsURL(function(base64Img) {
        $('.cover')
            .find('.image')
            .css({
                backgroundImage: 'url(' + base64Img + ')'
            })
            .find('img')
            .attr('src', base64Img);
    }));

    window.URL = window.URL || window.webkitURL;
    var useBlob = false && window.URL,
        response = {};

    function readImage(cb) {
        return function() {
            if (!this.files) return;
            var file = this.files[0];
            var reader = new FileReader();

            reader.addEventListener("load", function() {
                var image = new Image();
                image.addEventListener("load", function() {
                    // console.info(file, 'file', reader)

                    response.width = image.width;
                    response.height = image.height;

                    if (useBlob) {
                        window.URL.revokeObjectURL(image.src);
                    }
                    response.src = reader.result
                    cb(response);
                });
                image.src = useBlob ? window.URL.createObjectURL(file) : reader.result;
            });

            reader.readAsDataURL(file);
        }
    }

    imageEmbed.on('change', readImage(function(response) {
        var image = $('<div class="image-wrapper embed item" data-w="' + response.width + '" data-h="' + response.height + '"><img data-src="' + response.src + '" src="blank.gif" alt=""><div class="bottom"><p class="caption wysiwyg is-editable" contenteditable data-placeholder="Image Caption"></p></div></div>'); //<p class="credit"><a href="' + response.author_url + '">' + response.author_name + '</a></p></div></div>');
        var image = $('<div class="image-wrapper embed item" data-w="' + response.width + '" data-h="' + response.height + '"><img src="' + response.src + '" alt=""><div class="bottom"><p class="caption wysiwyg is-editable" contenteditable data-placeholder="Image Caption"></p></div></div>'); //<p class="credit"><a href="' + response.author_url + '">' + response.author_name + '</a></p></div></div>');

        var active = $('.section.active');

        if (active.hasClass('grid')) {
            $('.section.active').append(image);
        } else {
            $('.section.active').html(image);
        }

        $('.section.grid').flexImages({
            rowHeight: 300
        })
    }));

    $('.sidebar .close').on('click', function() {
        $('.sidebar').removeClass('show');
    });

    $('.search-container button[type="submit"]').on('click', function() {
        var $el = $(this).next('input.search');
        var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=25f384e2aac39aebca417e60654c39e3&text=" + $el.val() + "&safe_search=1&per_page=100&sort=relevance";
        var src;
        $.getJSON(url + "&format=json&jsoncallback=?", function(data) {
            if ('ok' !== data.stat) {
                return;
            }
            $(".sidebar .inner").empty();
            $.each(data.photos.photo, function(i, item) {

                src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
                $("<img/>").attr("src", src).appendTo(".sidebar .inner").on('click', function() {
                    $.getJSON('http://noembed.com/embed?url=https://www.flickr.com/photos/' + item.owner + '/' + item.id + '', function(response) {
                        // if ($('.section.active').hasClass('grid')) {
                        //     $('.section.active').append(response.html);
                        // } else {
                        //     $('.section.active').html(response.html);
                        // }
                        insertImage(response)

                    })
                })
            });
        });
    })

    $(document).on('click', '.preview', function() {
        $('body').toggleClass('preview');
        if ($(this).is('.button')) {
            $('.placeholder').remove();
        } else {
            updatePlaceholder();
        }

    })



$(function() {
    $("#btnSave").click(function() {



        html2canvas($("#export"), {
            onrendered: function(canvas) {
                canvas.setAttribute("id", "c");
                document.body.appendChild(canvas);
                // canvas.toBlob(function(blob) {
                //     console.info(blob, 'before convert')
                // })


                console.warn(canvas.toDataURL( 'image/svg'), 'toDataURL')

                var CanvasContext = document.getElementById('c')
                console.info(CanvasContext.getContext('2d'), 'CanvasContext')


                var ctx = new C2S(canvas.getContext('2d'));
                // canvas.
                // $("#img-out").append(canvas);

                // var FabricCanvas = new fabric.Canvas('c');
                // FabricCanvas.add(new fabric.Canvas(canvas));

                console.info(ctx.getSvg(), 'fabric')


                // theCanvas = canvas;

                // console.info(canvas, 'canvas');

                // console.info(canvas.getSerializedSvg(true), 'svg');

                // Convert and download as image
                // Canvas2Image.saveAsPNG(canvas);
                $("#img-out").append(ctx.getSvg());
                // canvas.toBlob(function(blob) {
                //     console.info(blob, 'after convert')
                // })


                // Clean up
                document.body.removeChild(canvas);
            }
        });
    });
});



    function insertImage(response) {
        // console.info(response, 'insertImage');
        var image = $('<div class="image-wrapper embed item" data-w="' + response.width + '" data-h="' + response.height + '"><a href="' + response.web_page + '"><img data-src="' + response.media_url + '" src="blank.gif" alt=""></a><div class="bottom"><span class="caption"><span class="credit"><a href="' + response.author_url + '">' + response.author_name + '</a></div></div>');
        var image = $('<div class="image-wrapper embed item" data-w="' + response.width + '" data-h="' + response.height + '"><img data-src="' + response.media_url + '" src="blank.gif" alt=""><div class="bottom"><p class="caption wysiwyg is-editable" contenteditable data-placeholder="Image Caption"></p><p class="credit"><a href="' + response.author_url + '">' + response.author_name + '</a></p></div></div>');
        var image = $('<div class="image-wrapper embed item" data-w="' + response.width + '" data-h="' + response.height + '"><img src="' + response.media_url + '" alt=""><div class="bottom"><p class="caption wysiwyg is-editable" contenteditable data-placeholder="Image Caption"></p><p class="credit"><a href="' + response.author_url + '">' + response.author_name + '</a></p></div></div>');

        var active = $('.section.active');

        if (active.hasClass('grid')) {
            $('.section.active').append(image);
        } else {
            $('.section.active').html(image);
        }

        $('.section.grid').flexImages({
            rowHeight: 300
        })
    };

    $('.section.grid').flexImages({
        rowHeight: 300
    })

    var removeBtn = $('<i class="button remove ion-close"></i>');
    var fitBtn = $('<i class="button ion-arrow-shrink" data-lz-size="fit"></i>');
    var fillBtn = $('<i class="button ion-arrow-expand" data-lz-size="full"></i>');
    var leftBtn = $('<i class="button ion-chevron-left" data-lz-position="left"></i>');
    var rightBtn = $('<i class="button ion-chevron-right" data-lz-position="right"></i>');
    var centerBtn = $('<i class="button ion-code" data-lz-position="center"></i>');

    var actions = $('<div class="actions"></div>');
    actions.append(removeBtn);
    actions.append(fitBtn);
    actions.append(fillBtn);
    actions.append(leftBtn);
    actions.append(rightBtn);
    actions.append(centerBtn);

    $(document).on('click', '.embed', function() {
            removeBtn.off('click');
            fitBtn.off('click');
            fillBtn.off('click');
            leftBtn.off('click');
            rightBtn.off('click');
            centerBtn.off('click');
            // alert('hover')
            var $el = $(this)
            $(this).append(actions)
            removeBtn.on('click', function() {
                $el.remove();
            });
            fitBtn.on('click', function() {
                $el.parents('.section').removeClass('stretch left right').addClass('fit');
            });
            fillBtn.on('click', function() {
                $el.parents('.section').removeClass('fit left right').addClass('stretch');
            });
            leftBtn.on('click', function() {
                $el.parents('.section').removeClass('fit right').addClass('stretch left');
            });
            rightBtn.on('click', function() {
                $el.parents('.section').removeClass('fit left').addClass('stretch right');
            });
            centerBtn.on('click', function() {
                $el.parents('.section').removeClass('right left');
            });
        })
        // $(document).on('blur','.embed', function() {
        //     removeBtn.remove();
        // })

    $(document).on('focus', '.section', function() {
        var $el = $(this);
        $('.active').removeClass('active');
        $el.addClass('active');
        // $('.sidebar .inner').empty();

        // var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=25f384e2aac39aebca417e60654c39e3&license=4,5,6&text=laborador&safe_search=1&per_page=100";
        // var src;
        // $.getJSON(url + "&format=json&jsoncallback=?", function(data) {

        //     // for (var i = 0; i < data.photos.photo.length; i++) {
        //     //     var item = data.photos.photo[i]
        //     // };

        //     $.each(data.photos.photo, function(i, item) {
        //         src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
        //         $("<img/>").attr("src", src).appendTo(".sidebar .inner").on('click', function() {
        //                 //https://www.flickr.com/photos/{user-id}/{photo-id}
        //                 $.getJSON('http://noembed.com/embed?url=https://www.flickr.com/photos/' + item.owner + '/' + item.id + '', function(response) {
        //                     insertImage(response)
        //                         // need to create some sort of unified template here that doesn't use iframes
        //                         // $('.section.active').html(response.html); //.append(response.html);

        //                 })
        //             })
        //             // if (i == 3) return false;
        //     });
        // });

        // var API_KEY = '4396031-7b2c31aee272234474b466f3a';
        // var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
        // $.getJSON(URL, function(data){
        //     if (parseInt(data.totalHits) > 0)
        //         $.each(data.hits, function(i, hit){
        //             console.log(hit.pageURL);
        //             $('.sidebar .inner').append('<img src="'+hit.previewURL+'" />')
        //         });
        //     else
        //         console.log('No hits');
        // });

        var input = $('<input type="text"></input>');
        $.each($(this).data(), function(index, value) {
            var lz = new RegExp("^lz", "i");

            if (lz.test(index)) {
                var key = index.replace('lz', '').toLowerCase();
                if ('type' == key) {
                    switch (value) {
                        case 'text':
                            addTextNode($el);
                            break;
                        case 'image':
                            addImageNode($el);
                            break;
                        case 'video':
                            addVideoNode($el);
                            break;
                        case 'audio':
                            addAudioNode($el);
                            break;
                        default:
                            addDefaultNode($el);
                            return false;
                            break;
                    }
                }
            }
        });

        // console.info('focued', $(this), document.activeElement)
    });

    $('.main').on('click', function() {
        // $('.sidebar').removeClass('show');
    })

    // $('.sidebar .inner').append($("<label>"+index+"<br></label><input type='text' value='"+value+"' /><hr>"));

    function addTextNode($el) {
        $('.sidebar').removeClass('show');
        // $('.sidebar .inner').append($("<h4>" + $el.attr('data-lz-type') + "</h4>"));
        //         add configuration for text nodes
        var attributes = lz.text;

    }

    function addImageNode($el) {
        // $('.sidebar .inner').append($("<h4>" + $el.attr('data-lz-type') + "</h4>"));
        $('.sidebar').addClass('show');
        //         add configuration & api for images
        var attributes = lz.image;

    }

    function noEmbed(target, url) {
        $.getJSON('http://noembed.com/embed?url='+url, function(response) {
            var embed = $('<div class="embed-container"></div>');
            embed.html(response.html);

            target.html(embed);
        })
    }

    function getPastedData(ev, format) {
        var clipboardData, pastedData;

        ev.stopPropagation();
        ev.preventDefault();

        clipboardData = ev.clipboardData || window.clipboardData;
        return clipboardData.getData(format);

    }

    function addVideoNode($el) {
        $('.sidebar').removeClass('show');
        var el = $('.section.active')[0];
        el.addEventListener('paste', function(ev) {
            var url = getPastedData(ev, 'Text');
            noEmbed($el, url)
        });
    }

    function addAudioNode($el) {
        $('.sidebar').removeClass('show');
        var el = $('.section.active')[0];
        el.addEventListener('paste', function(ev) {
            var url = getPastedData(ev, 'Text');
            noEmbed($el, url)
        });
    }

    function addDefaultNode($el) {
        $('.sidebar').removeClass('show');
        // $('.sidebar .inner').append($("<h4>" + $el.attr('data-lz-type') + "</h4>"));
        // $('.sidebar').addClass('show');11
        //         add configuration & api for images
        var attributes = lz.image;

    }
    var lz = {
        "text": {
            "options": [

            ]
        },
        "image": {
            "options": [{
                "position": {
                    "type": "select",
                    "values": ["left", "center", "right"],
                    "default": "center"
                }
            }, {
                "fit": {
                    "type": "select",
                    "values": ["inline", "full", "window"],
                    "default": "inline"
                }
            }]
        },
        "video": {
            "options": [{
                "position": {
                    "type": "select",
                    "values": ["left", "center", "right"],
                    "default": "center"
                }
            }, {
                "fit": {
                    "type": "select",
                    "values": ["inline", "full", "window"],
                    "default": "inline"
                }
            }]
        },
        "audio": {
            "options": [{
                "position": {
                    "type": "select",
                    "values": ["left", "center", "right"],
                    "default": "center"
                }
            }, {
                "fit": {
                    "type": "select",
                    "values": ["inline", "full", "window"],
                    "default": "inline"
                }
            }]
        }
    }
})


var winHeight = parseInt($(window).height());
var scrollTop;
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var winH = $(window).height();

$('.body.wrap').scroll(function(event) {
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - scrollTop) <= delta)
        return;
    if (scrollTop > lastScrollTop) {
        // Scroll Down
        if (scrollTop >= winH) {
            $('main header').addClass('fixed');
        }

    } else if (scrollTop <= winH) {
        // Scroll Up
        if (scrollTop < winH) {
            $('main header').removeClass('fixed');
        }
    }
    lastScrollTop = scrollTop;
}

    var coverHeight = $('.cover').height();
function adjustCover() {
    var $el = $('.body.wrap');
    // get the current scroll position
    scrollTop = $el.scrollTop();
    // make sure the cover container is still visible
    if (scrollTop > winHeight) return;
    $('.cover .text').css({
            // height: winHeight - scrollTop + 'px',
            marginTop: scrollTop + 'px',
            opacity: (coverHeight - scrollTop) / coverHeight * 0.9
        })
        // adjust the cover image
    $('.cover .image').css({
        height: winHeight - scrollTop + 'px',
        marginTop: scrollTop * .8 + 'px',
        opacity: (coverHeight - scrollTop) / coverHeight * 0.9
        // filter: 'blur('+(coverHeight - scrollTop) / coverHeight * 2.3+'px)'
    })

}

function setScroll() {
    var wintop = $('.body.wrap').scrollTop(),
        docheight = $('.body.wrap').prop('scrollHeight'),
        winheight = $(window).height();
    // console.info($('.body.wrap').scrollTop(), $('.section.cover').height(), wintop, docheight, winheight)
    var scrolled = (wintop / (docheight - winheight)) * 100;


    $('.progress').css('width', (scrolled + '%'));

}


$('.body.wrap').on('scroll', function() {
    adjustCover();
    setScroll();
})
$(window).on('resize', function() {
    winHeight = parseInt($(window).height());
    adjustCover();
    setScroll();
})

$(document).ready( function() {
            $('#accentColor').each( function() {
                //
                // Dear reader, it's actually very easy to initialize MiniColors. For example:
                //
                //  $(selector).minicolors();
                //
                // The way I've done it below is just for the demo, so don't get confused
                // by it. Also, data- attributes aren't supported at this time...they're
                // only used for this demo.
                //
                $(this).minicolors({
                    // control: $(this).attr('data-control') || 'hue',
                    defaultValue: $(this).attr('data-defaultValue') || '',
                    format: $(this).attr('data-format') || 'hex',
                    // keywords: $(this).attr('data-keywords') || '',
                    // inline: $(this).attr('data-inline') === 'true',
                    // letterCase: $(this).attr('data-letterCase') || 'lowercase',
                    opacity: $(this).attr('data-opacity'),
                    // position: $(this).attr('data-position') || 'bottom left',
                    // swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
                    change: function(value, opacity) {
                        if( !value ) return;
                        if( opacity ) value += ', ' + opacity;
                        if( typeof console === 'object' ) {
                            // console.log(value);
                            update(value)
                        }
                    }
                });
            });
        });
