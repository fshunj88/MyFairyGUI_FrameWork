namespace fgui {
    export class GearXY extends GearBase {
        public positionsInPercent: boolean;

        private _storage: Object;
        private _default: any;

        constructor(owner: GObject) {
            super(owner);
        }

        protected init(): void {
            this._default = {
                x: this._owner.x, y: this._owner.y,
                px: this._owner.x / this._owner.parent.width, py: this._owner.y / this._owner.parent.height
            };
            this._storage = {};
        }

        protected addStatus(pageId: string, buffer: ByteBuffer): void {
            var gv: any;
            if (pageId == null)
                gv = this._default;
            else {
                gv = {};
                this._storage[pageId] = gv;
            }
            gv.x = buffer.readInt();
            gv.y = buffer.readInt();
        }

        public addExtStatus(pageId: string, buffer: ByteBuffer): void {
            var gv: any;
            if (pageId == null)
                gv = this._default;
            else
                gv = this._storage[pageId];
            gv.px = buffer.readFloat();
            gv.py = buffer.readFloat();
        }

        public apply(): void {
            var pt: any = this._storage[this._controller.selectedPageId];
            if (!pt)
                pt = this._default;

            var ex: number;
            var ey: number;

            if (this.positionsInPercent && this._owner.parent) {
                ex = pt.px * this._owner.parent.width;
                ey = pt.py * this._owner.parent.height;
            }
            else {
                ex = pt.x;
                ey = pt.y;
            }

            if (this._tweenConfig != null && this._tweenConfig.tween && !UIPackage._constructing && !GearBase.disableAllTweenEffect) {
                if (this._tweenConfig._tweener != null) {
                    if (this._tweenConfig._tweener.endValue.x != ex || this._tweenConfig._tweener.endValue.y != ey) {
                        this._tweenConfig._tweener.kill(true);
                        this._tweenConfig._tweener = null;
                    }
                    else
                        return;
                }

                var ox: number = this._owner.x;
                var oy: number = this._owner.y;

                if (ox != ex || oy != ey) {
                    if (this._owner.checkGearController(0, this._controller))
                        this._tweenConfig._displayLockToken = this._owner.addDisplayLock();

                    this._tweenConfig._tweener = GTween.to2(ox, oy, ex, ey, this._tweenConfig.duration)
                        .setDelay(this._tweenConfig.delay)
                        .setEase(this._tweenConfig.easeType)
                        .setTarget(this)
                        .onUpdate(this.__tweenUpdate, this)
                        .onComplete(this.__tweenComplete, this);
                }
            }
            else {
                this._owner._gearLocked = true;
                this._owner.setPosition(ex, ey);
                this._owner._gearLocked = false;
            }
        }

        private __tweenUpdate(tweener: GTweener): void {
            this._owner._gearLocked = true;
            this._owner.setPosition(tweener.value.x, tweener.value.y);
            this._owner._gearLocked = false;
        }

        private __tweenComplete(): void {
            if (this._tweenConfig._displayLockToken != 0) {
                this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
                this._tweenConfig._displayLockToken = 0;
            }
            this._tweenConfig._tweener = null;
        }

        public updateState(): void {
            var pt: any = this._storage[this._controller.selectedPageId];
            if (!pt) {
                pt = {};
                this._storage[this._controller.selectedPageId] = pt;
            }

            pt.x = this._owner.x;
            pt.y = this._owner.y;
            pt.px = this._owner.x / this._owner.parent.width;
            pt.py = this._owner.y / this._owner.parent.height;
        }

        public updateFromRelations(dx: number, dy: number): void {
            if (this._controller == null || this._storage == null || this.positionsInPercent)
                return;

            let keys = Object.keys(this._storage);
            for (var key of keys) {
                var pt: any = this._storage[key];
                pt.x += dx;
                pt.y += dy;
            }
            this._default.x += dx;
            this._default.y += dy;

            this.updateState();
        }
    }
}
