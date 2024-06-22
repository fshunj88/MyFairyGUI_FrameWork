/// <reference path="WarFlagMgr.ts" />
/// <reference path="../uiFramework/BaseView.ts" />


class WarHomeView extends Core.BaseView {
    private _labelCom:fgui.GComponent;

    public static open() {
        Core.ViewManager.inst.open("warHomeView");
    }

    public static async close() {
        await Core.ViewManager.inst.close("warHomeView");
    }

    public initUI() {
        super.initUI();
        this.adjust(this.getChild("bg"));
        this.getChild("top").height += window.support.topMargin;
        this._labelCom = this.getChild("time").asCom;
        this.center();
    }

    @MVC.observe(WarFlagMgr, "openWarHomeFinished")
    private _openWarHomeFinished() {
        console.log("_openWarHomeFinished called");
    }

    @MVC.observe(WarFlagMgr, "time")
    private _onTimeChanged(newTime: number, oldTime: number) {
        console.log(`Tick:${newTime}`);
        this._labelCom.getChild("title").asLabel.text = `Tick:${newTime}`;
    }

    public refreshUI() {

    }

    private static _inst: WarHomeView;
    public static get inst() { return this._inst; };
    public async open(...param: any[]) {
        await super.open(...param);
        this.refreshUI();
        MVC.Controller.inst.bind(WarFlagMgr.inst, this, false);
        WarFlagMgr.inst.openWarHomeFinished = true;
        WarFlagMgr.inst.openWarHomeFinished2 = true;
        WarFlagMgr.inst.init();
    }


    public async close(...param: any[]) {
        console.log("before unbind");
        MVC.Controller.inst.unbind(WarFlagMgr.inst, this);
        console.log("again");
        WarFlagMgr.inst.openWarHomeFinished = true;
        WarHomeView._inst = null;
        await super.close(...param);
    }
}

