
async function main() {
  console.log(await window.api.settings.invoke('getSettings'));

  window.api.settings.send('openFolderClicked', '123');


  window.api.settings.on('settingsUpdated', (event, settings) => {
    console.log('Settings updated event');
    console.log(settings);
  })

  window.api.settings.invoke('updateSettings', { a: 100, b: 'new' });
}

main();
