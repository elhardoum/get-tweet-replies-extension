(function()
{
    let handles = [], collect

    new Promise(res => 
    {
        new MutationObserver(function()
        {
            let el
            if ( el = document.querySelector('.PermalinkOverlay-body') ) {
                res(el)
                this.disconnect()
            }
        }).observe(document.body, {
            subtree: true,
            childList: true,
        })
    }).then(el =>
    {
        (collect = _ => {
            el.querySelectorAll('#stream-items-id [data-item-type="tweet"] > [data-screen-name]:not(.eredd)').forEach(div =>
                handles.push( div.dataset.screenName ) && div.classList.add('eredd')
            )
            el.querySelectorAll('.ThreadedConversation-moreRepliesLink').forEach( a => a.click() )
            document.querySelectorAll('.ThreadedConversation-showMoreThreadsButton').forEach(b => b.click())
            document.querySelectorAll('.ThreadedConversation-showMoreThreadsPrompt').forEach(b => b.click())
            document.querySelector('.PermalinkOverlay-body .stream-loading .spinner').scrollIntoView()

            let elem_count = [
                '.PermalinkOverlay-body .ThreadedConversation-moreRepliesSpinner',
                '.ThreadedConversation-showMoreThreadsButton',
                '.ThreadedConversation-showMoreThreadsPrompt',
                '.PermalinkOverlay-body .stream-loading .spinner',
                '.ThreadedConversation-moreRepliesLink'
            ].filter(s => document.querySelector(s)).length

            if ( ! elem_count || ( 1 === elem_count && 'none' === window.getComputedStyle(el.querySelector('.stream-loading'), null).getPropertyValue('display') ) ) {
                // done
                return chrome.runtime.sendMessage({ extracted_handles: handles })
            }

            setTimeout(collect, 2000)
        })()

    })

    // .ThreadedConversation-moreRepliesLink
    // .PermalinkOverlay-body .stream-loading .spinner
    // .PermalinkOverlay-body .stream-item
    // .ThreadedConversation-moreRepliesSpinner
})()
