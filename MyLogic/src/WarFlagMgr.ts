/// <reference path="../MVVM/Model.ts" />
/**
 * WarFlagRefreshMgr普遍用于各种事件的控制
 */
@MVC.autoModelName
class WarFlagMgr extends MVC.Model {
    private static _inst: WarFlagMgr;

    public static get inst(): WarFlagMgr {
        if (!WarFlagMgr._inst) {
            WarFlagMgr._inst = new WarFlagMgr();
        }
        return WarFlagMgr._inst;
    }

    public init() {
        this._time = 0;
        fgui.GTimers.inst.add(1000,
            -1,
            () => {
                this.time++;
            }
            ,
            this);
    }

    public constructor() {
        super();
    }

    private _time: number;
    public get time() { return this._time; };
    public set time(val: number) { this._time = val; };

    private _openWarHomeFinished: boolean;
    public get openWarHomeFinished() { return false; };
    public set openWarHomeFinished(val: boolean) { this._openWarHomeFinished = val; };

    private _openWarHomeFinished2: boolean;
    public get openWarHomeFinished2() { return false; };
    public set openWarHomeFinished2(val: boolean) { this._openWarHomeFinished2 = val; };

}