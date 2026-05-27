const bc = {
  postMessage(msg) {
    try {
      const channel = new BroadcastChannel('my-channel')
      channel.postMessage(msg)
    } catch (e) {
      // BroadcastChannel not supported
    }
  },
}

export default bc
