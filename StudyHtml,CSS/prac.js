function login() {
  const id = document.getElementById('id').value;

  const eventSource = new EventSource(`/subscribe/` + id);

  eventSource.addEventListener("sse", function(event) {
    console.log(event.data);

    const data = JSON.parse(event.data);

    (async () => {
      // notification of browser
      const showNotification = () => {

        const notification = new Notification('코드봐줘 ', {
          body: data.content
        });
      }

      // access notification of browser
      let granted = false;

      if(Notification.permission === 'granted') {
        granted = true;
      } else if(Notification.permission !== 'denied') {
          let permission = await Notification.requestPermission();
          granted = permission ==='granted';
      }

      // show noti
      if(granted){
        showNotification();
      }
    })();

  })
}