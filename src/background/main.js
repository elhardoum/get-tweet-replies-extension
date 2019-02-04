(function()
{
    chrome.runtime.onMessage.addListener((data, sender) =>
    {
        if ( 'extracted_handles' in data && data.extracted_handles ) {
            chrome.tabs.update(sender.tab.id, { active: true }, t =>
            {
                data.extracted_handles.length
                  ? window.prompt( `Extracted ${data.extracted_handles.length} handles:`, data.extracted_handles )
                  : alert( 'No handles were extracted.' )
            })
        }

        return true 
    })
})()
