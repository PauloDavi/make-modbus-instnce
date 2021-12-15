import { contextBridge, ipcRenderer, remote } from 'electron'
import ini from 'ini'
import { DataProps } from '../src/pages/Form'
import fs from 'fs'

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  saveIni({name, ...data}: DataProps) {
    fs.writeFileSync(`./assets/configs/${name}.ini`, ini.stringify(data))
  },

  openIni() {
    remote.dialog.showOpenDialog({ properties: ['openFile'] })
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  }
}

contextBridge.exposeInMainWorld('Main', api)
