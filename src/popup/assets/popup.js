(function()
{
    let tab

    document.forms[0].addEventListener('submit', e =>
    {
        e.preventDefault()

        let input = document.forms[0].querySelector('input[type="text"]')
          , tweet_url = ( '' + ( input || {} ).value ).trim()

        if ( ! tweet_url || ! /https?:\/\/(www.)?twitter\.com\/.+\d{10,}/.test( tweet_url ) )
            return input.focus()

        document.querySelectorAll('iframe').forEach(i => i.remove())

        chrome.tabs.getSelected(null, t =>
        {
            chrome.tabs.create({ url: tweet_url + ( tweet_url.indexOf('?') > 0 ? '&' : '?' ) + 'get-tweet-replies' }, new_tab =>
            {
                tab = new_tab
                chrome.tabs.update(t.id, { active: true })
            })
        })

    }, false)
})()