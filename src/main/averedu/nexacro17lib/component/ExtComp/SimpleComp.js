//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2014 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro-public-license-readme-1.0.html	
//
//==============================================================================


if (!nexacro._ExprInfo)
{
    //==============================================================================
    // nexacro._ExprInfo for nexacro.ComplexComponent
    //==============================================================================

    // [BindInfo Information ó��]
    // InnerBind/FullBind�� ���� BindInfo ���� ó��

    nexacro._ExprInfo = function ()
    {
        this.baseid = "";               // expr info base id,
        this.basesq = -1;               // expr info base index (multi items index)
        this.target = null;             // expr target child control id,                null/empty/undefiend = self target
        this.setter = "";               // expr target setter function id,              null/empty/undefiend = no action
        this.values = null;             // expr result value, variant or array,         null/empty/undefiend = value;

        this.exprcx = "";               // expr syntax string
        this.exprix = -1;               // expr cache index
    };

    var _pExprInfo = nexacro._createPrototype(Object, nexacro._ExprInfo);
    nexacro._ExprInfo.prototype = _pExprInfo;
    _pExprInfo._type_name = "_ExprInfo";

    // public methods
    /*
    _pBindInfo.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    _pExprInfo._isSetExprCtx = function ()
    {
        return this.exprcx != "";
    };
    _pExprInfo._isSetExprIdx = function ()
    {
        return this.exprix >= 0;
    };

    _pExprInfo._setExprFuncCtx = function (funcctx)
    {
        this.exprcx = funcctx;
    };
    _pExprInfo._setExprFuncIdx = function (funcidx)
    {
        this.exprix = funcidx;
    };
    _pExprInfo._setExprInfo = function (exprinfo)
    {
        this.exprif = exprinfo;
    };

    _pExprInfo._clear = function ()
    {
        /*
        this.baseid = "";
        this.basesq = -1;
        this.setter = "";
        */

        this.target = null;
        this.values = null;

        this.exprif = null;
        this.exprcx = "";
        this.exprix = -1;
    };

    delete _pExprInfo;
};


if (!nexacro._ExprData)
{
    //==============================================================================
    // nexacro._ExprData for nexacro.ComplexComponent
    //==============================================================================

    // [BindData Information ó��]
    // InnerBind/FullBind�� Dataset ���� ó��
    // ValueBind�� SimpleComponent ���    

    nexacro._ExprData = function (valueexpr, dataexpr, fullexpr)
    {
        this._setExprType(valueexpr, dataexpr, fullexpr);

        this._exprparser = null;        // nexacro.ExprParser
        this._exprtarget = null;        // Expr Target Component

        this._exprinfo = [];            // Expr Info Array
        this._exprfunc = [];            // Expr Func Array
        /*
        this._useexprcache = false;     // Expr Cache
        this._expridxcache = {};        // Expr Func Index Cache
        this._exprretcache = [];        // Expr Func Return Cache
        this._exprexecache = [];        // Expr Func Execute Cache
        */
    };

    var _pExprData = nexacro._createPrototype(Object, nexacro._ExprData);
    nexacro._ExprData.prototype = _pExprData;
    _pExprData._type_name = "_ExprData";

    // public methods
    /*
    _pExprData.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    _pExprData._setExprType = function (valueexpr, dataexpr, fullexpr, xmlexpr, jsonexpr)
    {
        this._exprtype = (valueexpr ? 0x01 : 0) + (dataexpr ? 0x02 : 0) + (xmlexpr ? 0x04 : 0) + (jsonexpr ? 0x08 : 0) + (fullexpr ? 0x10 : 0);
    };

    _pExprData._isValueExpr = function ()   { return (this._exprtype & 0x01) != 0; };
    _pExprData._isInnerExpr = function ()   { return (this._exprtype & 0x02) != 0; };
    _pExprData._isFullExpr = function ()    { return (this._exprtype & 0x10) != 0; };
    _pExprData._isDataExpr = function ()    { return (this._exprtype & 0x1E) != 0; };
    _pExprData._isXMLExpr = function ()     { return (this._exprtype & 0x04) != 0; };
    _pExprData._isJSONExpr = function ()    { return (this._exprtype & 0x08) != 0; };

    _pExprData._initExprParser = function ()
    {
        // TODO : Change Global Static Parser
        this._exprparser = new nexacro.ExprParser();
    };
    _pExprData._initExprOwner = function (owner)
    {
        this._exprowner = owner;
    };
    _pExprData._initExprTarget = function (target)
    {
        this._exprtarget = target;
    };

    _pExprData._getExprInfos = function ()
    {
        return this._exprinfo;
    };
    _pExprData._initExprInfo = function (exprinfo)
    {
        if (exprinfo && this._exprparser && this._exprtarget)
        {
            var exprcx = exprinfo.exprcx;
            var exprfn = nexacro._createInlineFunc(this._exprparser.makeExpr(this._exprtarget, exprcx));

            if (exprfn)
            {
                exprinfo._setExprFuncIdx(this.setExprFunc(exprcx, exprfn));
            }
        }
    };
    _pExprData._initExprInfoArray = function (exprinfos)
    {
        if (exprinfos)
        {
            for (var i = 0, l = exprinfos.length; i < l; i++)
            {
                this._initExprInfo(exprinfos[i]);
            }
        }
    };
    _pExprData._pushExprInfoArray = function (exprinfos)
    {
        if (exprinfos)
        {
            for (var i = 0, l = exprinfos.length; i < l; i++)
            {
                this._exprinfo.push(exprinfos[i]);
                exprinfos[i] = null;
            }
        }
    };
    _pExprData._pushInfoArray = function (infos, array)
    {
        if (infos && array)
        {
            for (var i = 0, l = infos.length; i < l; i++)
            {
                array.push(infos[i]);
                infos[i] = null;
            }
        }
    };
    _pExprData._setExprInfos = function (exprinfos)
    {
        this._clearExprInfos();
        this._clearExprFuncs();

        this._addExprInfo(exprinfos);
    };
    _pExprData._addExprInfo = function (exprinfo)
    {
        if (exprinfo.length)
        {
            this._initExprInfoArray(exprinfo);
            this._pushExprInfoArray(exprinfo);
        }
        else
        {
            this._initExprInfo(exprinfo);
            this._exprinfo.push(exprinfo);
        }
    };
    _pExprData.setExprFunc = function (exprctx, exprfunc)
    {
        var expridx = this._exprfunc.length;

        this._exprfunc.push(exprfunc);

        // TODO : exprfunc cache
        /*
        if (this._useexprcache)
        {
            this._expridxcache[exprctx] = expridx;
            this._exprretcache[expridx] = null;
            this._exprrescache[expridx] = false;
        }
        */

        return expridx;
    };
    _pExprData.getExprFuncByIdx = function (index)
    {
        return index >= 0 && index < this._exprfunc.length ? this._exprfunc[index] : null;
    };
    _pExprData.getExprFuncByCtx = function (ctx)
    {
        // TODO : exprfunc cache
        /*
        if (this._useexprcache)
        {
            return this.getExprFuncByIdx(this.getExprCacheIdx(ctx));
        }
        */
    };

    // TODO : exprfunc cache
    /*
    _pExprData.setExprCacheIdx = function (exprctx, expridx)
    {
        this._expridxcache[exprctx] = expridx;
    };
    _pExprData.setExprCacheRet = function (expridx, exprret)
    {
        this._exprretcache[expridx] = exprret;
    };
    _pExprData.getExprCacheIdx = function (exprctx)
    {
        return this._expridxcache[exprctx];
    };
    _pExprData.getExprCacheRet = function (expridx)
    {
        return expridx < this._exprretcache.length;
    };
    _pExprData.getExprCacheRet = function (expridx)
    {
        if (expridx < this._exprretcache.length)
            return this._exprretcache[expridx];
        else
            return 
    };
    */

    _pExprData._getExprData = function (index)
    {
        var infos = this._exprinfo;

        if (infos)
        {
            for (var i = 0, l = infos.length; i < l; i++)
            {
                var info = infos[i];

                if (info)
                {
                    info.values = this._fetchExprData(info.exprix, index);
                }
            }
        }

        return this;
    };

    _pExprData._fetchExprData = function (exprix, index)
    {
        if (exprix >= 0)
        {
            // TODO : exprfunc cache
            /*
            if (this._useexprcache)
            {
                var exprex = this._exprexecache[exprix];

                if (exprex)
                {
                    return this._exprretcache[exprix];
                }

                var exprfn = this._exprfunc[exprix];

                if (exprfn)
                {
                    var ret = exprfn.call(this._exprowner, this._exprtarget);

                    this._exprretcache[exprix] = ret;
                    this._exprexecache[exprix] = true;

                    return ret;
                }
            }
            else
            */
            {
                var exprfn = this._exprfunc[exprix];

                if (exprfn)
                {
                    return exprfn.call(this._exprowner, this._exprtarget);
                }
            }
        }

        return undefined;
    };

    _pExprData._clearExprTarget = function ()
    {
        this._exprtarget = null;
    };
    _pExprData._clearExprParser = function ()
    {
        if (this._exprparser)
        {
            delete this._exprparser;
            this._exprparser = null;
        }
    };
    _pExprData._clearExprInfos = function ()
    {
        for (var i = 0, l = this._exprinfo.length; i < l; i++)
        {
            if (this._exprinfo[i])
            {
                this._exprinfo[i]._clear();
                delete this._exprinfo[i];
                this._exprinfo[i] = null;
            }
        }

        this._exprinfo = [];
    };
    _pExprData._clearExprFuncs = function ()
    {
        for (var i = 0, l = this._exprfunc.length; i < l; i++)
        {
            if (this._exprfunc[i])
            {
                delete this._exprfunc[i];
                this._exprfunc[i] = null;
            }
        }

        this._exprfunc = [];
    };

    /*
    _pExprData._resetExprRetCache = function ()
    {
        for (var i = 0, l = this._exprretcache.length; i < l; i++)
        {
            this._exprretcache[i] = null;
        }
    };
    _pExprData._resetExprExeCache = function ()
    {
        for (var i = 0, l = this._exprexecache.length; i < l; i++)
        {
            this._exprexecache[i] = false;
        }
    };
    _pExprData._clearExprIdxCache = function ()
    {
        this._exprcache = {};
    };
    _pExprData._clearExprRetCache = function ()
    {
        this._resetExprRetCache();
        this._exprretcache = [];
    };
    _pExprData._clearExprExeCache = function ()
    {
    //  this._resetExprExeCache();
        this._exprexecache = [];
    };
    _pExprData._clearExprCache = function ()
    {
        this._clearExprRetCache();
        this._clearExprExeCache();
        this._clearExprIdxCache();
    };
    */

    _pExprData._clear = function ()
    {
    //  this._clearExprCache();
        this._clearExprInfos();
        this._clearExprFuncs();
        this._clearExprParser();
        this._clearExprTarget();
    };

    delete _pExprData;
};

if (!nexacro._SelectInfo)
{
    //==============================================================================
    // nexacro._SelectInfo for nexacro.SimpleComponent
    //==============================================================================

    // [SelectInfo Information ó��]
    // InnerBind/FullBind�� ���� SelectInfo ���� ó��
    // SelectInfo�� ExprInfo�� ����Ͽ� ó����

    // nexacro._SelectConst
    nexacro._SelectConst =
    {
        SELECTTYPE_NONE: 0x00,         // None Select
        SELECTTYPE_VALUE: 0x01,        // Value Component Default
        SELECTTYPE_TEXT: 0x02,         // Text/Edit Component Select Default
        SELECTTYPE_COMP: 0x04,         // Simple Component Select Default
        SELECTTYPE_ITEM: 0x08,         // Complex Component Item Select Default
        SELECTTYPE_USER: 0xFF
    };

    // nexacro._SelectInfo
    nexacro._SelectInfo = function (selecttype, positcount, rangecount, multicount, unselvalue)
    {
        /*
        this._selectlist = [];          // select data list select:[range:[posit:[pos]...]...]...]

        this._unselvalue = null;        // unselect value
        this._selecttype = 0;           // select type : comp:component self, item:child item list, text:text property, value:value proeprty
        this._positcount = 1;           // select position dimension    posit:[pos][pos][pos]       0<=:no posit error, 1:single posit no array, 1>=:multi posit array
        this._rangecount = 1;           // select range dimension       range:[posit][posit]        0<=:no range error, 1:single range no array, 1>=:multi range array
        this._multicount = 0;           // select multi count           multi:[range][range]        0==:single select,  1:single select toggle,  1>=:multi select array limited,  0<:multi select unlimited
        this._currselect = -1;          // current select point for select list
        */

        this._initSelect(selecttype, positcount, rangecount, multicount, unselvalue);
    };

    var _pSelectInfo = nexacro._createPrototype(nexacro.Object, nexacro._SelectInfo);
    nexacro._SelectInfo.prototype = _pSelectInfo;
    _pSelectInfo._type_name = "_SelectInfo";

    // public methods
    /*
    _pSelectInfo.toString = function ()
    {
        return "[object " + this._type_name + "]";
    };
    */

    _pSelectInfo._initSelect = function (selecttype, positcount, rangecount, multicount, unselvalue)
    {
        this._selectlist = [];
        this._unselvalue = unselvalue;

        this._selecttype = selecttype ? selecttype : nexacro._SelectConst.SELECTTYPE_NONE;

        this._positcount = positcount ? positcount : 1;
        this._rangecount = rangecount ? rangecount : 1;
        this._multicount = multicount ? multicount : 1;

        this._currselect = this._multicount >= 0 ? this._multicount-1 : -1;
    };

    // TODO : Event ó���� SelectManager�� �����Ͽ� Manager���� ó��
    _pSelectInfo._setSelectEvent = function (target)
    {
        // set select event target
        this.eventtarget = target;
    };
    _pSelectInfo._clearSelectEvent = function ()
    {
        // clear scroll event
        this.eventtarget = null;
    };

    _pSelectInfo._getCurrentSelect = function ()
    {
        if (this._currselect < 0 || this._currselect >= this._selectlist.length)
            return this._unselvalue;
        else
            return this._selectlist[this._currselect];
    };
    _pSelectInfo._setCurrentSelect = function (select)
    {
        this._currselect = this._currselect < 0 ? 0 : this._currselect;
        this._selectlist.length = this._currselect + 1;

        var old = this._selectlist[this._currselect];
        if (old != select)
        {
            this._selectlist[this._currselect] = select;

            if (this.eventtarget)
                this.eventtarget._onChangeSelect(this, this.selecttype, old, select);
        }
    };
    _pSelectInfo._addMultiSelect = function (select)
    {
        if (this._multicount < 0)
        {
            this._currselect++;
            this._selectlist.length = this._currselect + 1;
            this._selectlist[this._currselect] = select;

            if (this.eventtarget)
                this.eventtarget._onChangeSelect(this, this.selecttype, null, select);
        }
        else if (this._multicount > 0)
        {
            if (this._currselect+1 < this._multicount)
            {
                this._currselect++;
                this._selectlist[this._currselect] = select;

                if (this.eventtarget)
                    this.eventtarget._onChangeSelect(this, this.selecttype, null, select);
            }
        }
    };
    _pSelectInfo._popMultiSelect = function ()
    {
        if (this._multicount < 0)
        {
            this._currselect--;
            this._selectlist.length = this._currselect - 1;

            if (this.eventtarget)
                this.eventtarget._onChangeSelect(this, this.selecttype, null, select);
        }
        else if (this._multicount > 0)
        {
            if (this._currselect-1 >= 0)
            {
                this._selectlist[this._currselect] = this._unselvalue;;
                this._currselect--;
            }
        }
    };

    _pSelectInfo._clearCurrentSelect = function ()
    {
        if (this._multicount)
            this._selectlist[this._currselect] = this._unselvalue;
        else
            this._clear();

        if (this.eventtarget)
            this.eventtarget._onChangeSelect(this, this.selecttype, this._currselect, null);
    };
    _pSelectInfo._clearMultiSelectList = function ()
    {
        this._selectlist = [];
        this._selectlist.length = this._multicount > 0 ? this._multicount : 0;
        this._currselect = this._multicount > 0 ? this._multicount-1 : -1;

        for (var i = 0, n = this._multicount; i < n; i++)
            this._selectlist[i] = this._unselvalue;

        if (this.eventtarget)
            this.eventtarget._onChangeSelect(this, this.selecttype, this._currselect, null);
    };

    _pSelectInfo._checkAboveCurrentSelect = function (idx1, idx2)
    {
        // TODO: check
    };
    _pSelectInfo._checkAboveMultiSelectList = function (idx1, idx2)
    {
        // TODO: check
    };

    _pSelectInfo._getMultiSelectCount = function ()
    {
        return this._multicount ? this._multicount : this._selectlist.length;
    };
    _pSelectInfo._getMultiSelectList = function ()
    {
        return this._selectlist;
    };

    _pSelectInfo._clear = function ()
    {
        this._selectlist = [];
        this._unselvalue = null;
        this._eventtarget = null;
        this._currselect = -1;
    };

    delete _pSelectInfo;
};

if (!nexacro.SimpleComponent)
{
    //==============================================================================
    // nexacro.UserEventInfo
    //==============================================================================
    /*
    nexacro.UserEventInfo = function (obj, id, arg)
    {
        this.id = this.eventid = id || "on";
        this.fromobject = this.fromreferenceobject = obj;
        this.arg = arg;
    };

    var _pUserEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.UserEventInfo);
    nexacro.UserEventInfo.prototype = _pUserEventInfo;
    _pUserEventInfo._type_name = "UserEventInfo";

    delete _pUserEventInfo;
    */

    //==============================================================================
    // nexacro.SimpleComponent
    //==============================================================================
 
    /* template comment
    // [interface:status]               : template code inteface comment
    // [interface.subinterface:status]  : sub interface comment
    // [interface/]                     : close comment
    */
    /* template code
    // nexacro                          : nexacro. �� ���� Package Name
    // SimpleComponent                  : SimpleComponent Type Name
    // Component                        : SimpleComponent Inherited Parent Component Type Name
    // BasicComponent                   : nexacro platform Basic Component
    // ControlComponent                 : User Component�� ���� Control Component
    // Property(n)                      : User Property
    // Method(n)                        : User Method
    // Event(n)                         : User Event
    // Variant(n)                       : User Variant
    // PredefineStatus(n)               : Component Status
    // Status(n)                        : User Status
    // DEFAULT_VALUE                    : Property default value
    */
  
    // [object.inherit:create]
    nexacro.SimpleComponent = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
    {
        nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

        // TODO : InitComponent�� �̵���ų��
        this._initProperties();
        this._initEvents();
    };

    // [object.prototype:create]
    var _pSimpleComponent = nexacro._createPrototype(nexacro.Component, nexacro.SimpleComponent);
    nexacro.SimpleComponent.prototype = _pSimpleComponent;

    // [component.typename:create]
    _pSimpleComponent._type_name = "SimpleComponent";   // ���� Component Type ���� ����, Override �ʿ�.
    _pSimpleComponent._is_simple_control = true;        // Simple/Complex Flag ���� ����, Override ����.


    //===============================================================
    // nexacro.SimpleComponent : Init
    //===============================================================

    // [component.variable:init]
    /*
    _pSimpleComponent._var1 = true;
    _pSimpleComponent._var2 = null;
    _pSimpleComponent._var3 = false;
    */

    // [object.property:init]
    /*
    _pSimpleComponent.prop1 = true;
    _pSimpleComponent.prop2 = false;
    _pSimpleComponent.prop3 = false;
    */

    // [component.status:init]
    /*
    _pComplexComponent._use_pushed_status = true;
    _pComplexComponent._use_selected_status = true;
    */

    // [component.accessibility:init]
    /*
    _pComplexComponent._accessibility_role = "RoleName";
    */

    // [object.event:init]
    /*
    _pSimpleComponent._event_list = 
    {
            "onlbuttondown": 1,
            "onlbuttonup": 1, 
            "onmouseenter": 1,
            "onmouseleave": 1,
            "onmousemove": 1,
            "onmove": 1,
            "onsize": 1,
            "onmousedown": 1,
            "onmouseup": 1,
            "ontouchstart": 1,
            "ontouchmove": 1,
            "ontouchend": 1,
            "onflingstart": 1,
            "onfling": 1,
            "onflingend": 1,
            "onpinchstart": 1,
            "onpinch": 1,
            "onpinchend": 1,
            "onlongpress": 1,
            "onslidestart": 1,
            "onslide": 1,
            "onslideend": 1
    };
    */


    //===============================================================
    // nexacro.SimpleComponent : Create/Destroy
    //===============================================================
 
    // [Simple Component ó��]
    // Control/Contents Element �� �ֿ� ���� Element(ex:IconText Element)�� ó�� code��
    // �ش� Element�� ������ Basic Component���� ��� ó��, ���� ��ӿ����� �������.
    
    // [object:create]                              // �̺κ��� override�� ����.
    _pSimpleComponent.create = function ()          
    {
        // check created
        if (this._is_created)
            return;

        // create component
        this.createComponent();
    };

    // [component:create]                           // override�� ������ ������
    _pSimpleComponent.createComponent = function (bCreateOnly)
    {
        // init component
        this._initComponent();

        // create component
        if (this.onCreateComponent())
        {
            // check created only
            if (!bCreateOnly)
            {
                this.onCreated(this._getWindow());
            }

            return true;
        }
        else
        {
            return false;
        }
    };

    // [component:create]                           // �̺κ� override�� basic component������
    _pSimpleComponent.onCreateComponent = function ()     
    {
        // check parent
        var parentElem = this._getParentElement();

        if (parentElem)
        {
            // create control element
            if (this._createControlElement(parentElem))
            {
                // init control elements
                this._initControlElement();

                // apply properties
                this._applyProperties();
                // apply accessibility
                this._applyAccessibility();

                // init bindinfo for value
                this._initBindInfo();
                // init exprinfo for value
                this._initExprInfo();
                // init/create contents
                this._initContents();
            }

            return true;
        }
        else
        {
            return false;
        }
    };

    // [component:created]                          // TODO: �ҽ�����        
    _pSimpleComponent.on_created = function (_window)
    {
        this.onCreated(_window);
    };

    // [component:created]                          // �̺κ� override�� �ּ�ȭ (window ���� ó������ override)
    _pSimpleComponent.onCreated = function (window)
    {
        // check form loading
        if (this._is_loading)                       // TODO:_is_loading? Ȯ��
            return;

        // check parent
        var parentElem = this._getParentElement();

        if (parentElem)
        {
            // check window
            window = window || this._getWindow();

            // created control element
            if (this._createdControlElement(window))
            {
                // created init logic
                this._initHotKey();
                this._resetStatus();

                // created contents
                if (!this._is_created)                 // TODO:_is_created? Ȯ��
                {
                    this._createdContents(window);    // Basic Component Override
                    this._is_created = true;
                }

                // layout
                this._recalcLayout();
            }
        }
    };

    // [component:init]                             // �̺κ� override�� ����
    _pSimpleComponent._initComponent = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight)
    {
        this._initUniqueID();
        this._initOverflow();
        this._initBind();
        this._initExpr();
        this._initSelect();
        this._initStatus();
    //  this._initProperties();
    //  this._initEvents();
        this._initAccessibility();
    };
    // [component:init]                             // Override ���� // TODO : createComponent ������ ����
    _pSimpleComponent._initComponentClone = function (source)
    {
        this._initUniqueID();
        this._initOverflow();
        this._initBind();
  	    this._initExpr();
  	    this._initSelect();
  	    this._initStatus();
    //  this._initProperties();
  	    this._cloneProperties(source);
    //  this._initEvents();
  	    this._initAccessibility();
    };
    // [component:init]                             // �̺κ� override�� ����
    _pSimpleComponent._initUniqueID = function ()
    {
        if (this._unique_id.length <= 0)
        {
            this._unique_id = this.parent && this.parent._unique_id ? (this.parent._unique_id + "." + this.id) : (this.id ? this.id : "");
        }
    };

    // [component:clone]      // Override ����
    _pSimpleComponent._cloneProperties = function (source)
  	{
  	    if (source) this._onCloneProperities(source);
  	};

    // [component:uninit]                          // �̺κ� override�� ����, TODO: Interface���� �и��Ұ�.
    _pSimpleComponent._uninitComponent = function ()
    {
        // clear propinit
        this._clearInitValue();
        // clear event listners
        this._clearEventListeners();
        // clear capture
        this._clearCaptureLock();
        // remove posbase
        this._clearBasedList();
        // remove parent
        this._clearParentsList();
        // clear inner vars 
        this._clearInnerVars();
        // clear style vars
        this._clearStyleVars();
    };
    
    // [component.properity.initvalue:clear]
    _pSimpleComponent._clearInitValue = function ()
    {
        // clear propinit
        if (this._setpropinitfn)
        {
            delete this._setpropinitfn;
            this._setpropinitfn = null;
        }
    };

    // [component.capture:clear]
    _pSimpleComponent._clearCaptureLock = function ()
    {
        // clear capture
        var _window = this._getWindow();
        if (_window && this._track_capture)
        {
            _window._releaseCaptureLock(this);
            _window._releaseCaptureLock(this._attached_comp);
            this._track_capture = false;
        }
    };

    // [component.position.base:clear]
    _pSimpleComponent._clearBasedList = function ()
    {
        // clear pos base list
        // this._removeBasedList();
    };

    // [component:clearParent]
    _pSimpleComponent._clearParentsList = function ()
    {
        // remove parent
        if (this.parent && this.parent.removeChild)
        {
            this.parent.removeChild(this.id);
        }
        else
        {
            var win = this._getWindow();
            if (win)
                win._removeFromCurrentFocusPath(this);
        }
    };

    // [component:clearinnervar]
    _pSimpleComponent._clearInnerVars = function ()
    {
        // clear inner vars // TODO:Interface���� �и�
        if (this._refform)
            this._refform = null;
        if (this.parent)
            this.parent = null;
        if (this._refobj)
            this._refobj = null;
        if (this.hotkey)
            this.hotkey = null;
        if (this.rtldirection)
            this.rtldirection = null;
        if (this._event_list)
            this._event_list = null;
        if (this._last_focused)
            this._last_focused = null;
        if (this._cssselector)
            this._cssselector = null;
        if (this._based_list)
            this._based_list = null;
    };

    // [component:clearstylevar]
    _pSimpleComponent._clearStyleVars = function ()
    {
        // clear style vars
        this._clearStyleObject();
    };

    // [component:destory]                          // �̺κ� override�� basic component������
    _pSimpleComponent.onDestroyComponent = function ()
    {
        // destory client contents
        //      if (!this._is_created)
        {
            this._is_created = false;
            this.onDestroyContents();               // ��� Component Override
        }

        // clear logic
        this._clearHotKey();
        this._clearBind();
        this._clearExpr();
        this._clearSelect();
        this._clearStatus();

        // clear accessibility
        this._clearAccessibility();
        // clear properties
        this._clearProperties();

        // destory controlelement
        this._destroyControlElement();
    };

    // [component:destroy]                          // override�� �ּ�ȭ. onDestroyComponent���� override ó��
    _pSimpleComponent.destroyComponent = function ()
    {
    //  if (!this._is_loading)                      // TODO:_is_loading? Ȯ��
        {
            this._is_alive = false;

            // uninit component
            this._uninitComponent();

            // destory override
            this.onDestroyComponent();

            return true;
        }
    };

    // [object:destroy]                             // override ����
    _pSimpleComponent.destroy = function ()
    {
        // check alive
        if (!this._is_alive)
            return false;

        // destroy component
        return this.destroyComponent();
    };



    //===============================================================
    // nexacro.SimpleComponent : Control Element
    //===============================================================
    
    // [���� Component ó��]
    // BasicComponent ������ ControlElement �����ڵ�����
    // UserComponent�� ControlElement ���� Override �� �����ڵ� �Ұ�

    // [component.controlelement:create]            // �̺κ� override�� basic component������
    _pSimpleComponent._createControlElement = function (parentElem)
    {
        var controlElem = this._control_element;
        if (!controlElem)
        {
            // create control element
            controlElem = this._onCreateControlElement(parentElem);
            // set nc control element
            controlElem._is_nc_element = this._is_nc_control;
        }

        return controlElem;
    };

    // [component.controlelement:create]            // �̺κ� override�� basic component������
    _pSimpleComponent._onCreateControlElement = function (parentElem)
    {
        return this.on_create_control_element(parentElem);// TODO : �ҽ�����
    };

    // [component.controlelement:init]              // �̺κ� override�� basic component������
    _pSimpleComponent._initControlElement = function ()
    {
        this._initControlElementStatus();
        this._initControlElementCssInfo();
        this._initControlElementPositionSize();
        this._initControlElementStyleProps();

    //  this.onInitControlElement();                // �� override ������ ����
    };

    // [component.controlelement.init:status]       // �̺κ� override�� basic component������
    _pSimpleComponent._initControlElementStatus = function ()
    {
        // visible                                  // TODO : �̺κ��� �־���ϴ��� Ȯ���ʿ�
        var visible = this.visible;
        if (!this.visible)
            this._control_element.setElementVisible(false);
        else
            this._control_element.setElementVisible(true);

        // disable
        /*
        var enable = this.enable;
        if (!this.enable)
            this._control_element.setElementEnable(false);
        else
            this._control_element.setElementEnable(true);
        */
        // readonly 
        /*
        var readonly = this.readonly;
        if (!this.readonly)
            this._control_element.setElementReadonly(false);
        else
            this._control_element.setElementReadonly(true);
        */
    };

    // [component.controlelement.init:cssinfo]      // �̺κ� override�� basic component������
    _pSimpleComponent._initControlElementCssInfo = function ()
    {
        // init css selector/make css map
        if (!this._is_initcssselector)
        {
            // set css selector
            this._setControlElementCssSelector();

            // make css mapinfo
            this._makeCSSMapInfo();

            // apply css mapinfo
            this._setControlElementCssMapInfo();

            this._is_initcssselector = true;
        }
    };

    // [component.controlelement.cssselector:set]   // �̺κ� override�� basic component������
    _pSimpleComponent._setControlElementCssSelector = function ()
    {
        this.on_apply_cssselector();                // TODO : on override�� �־���ϴ��� Ȯ���� ����ȣ��

        /*
        this._setControlElementCssTypeSelector();
        this._setControlElementCssIDSelector();
        this._setControlElementCssClassSelector();
        */
    };
    // [component.controlelement.cssmapinfo:set]    // �̺κ� override�� basic component������
    _pSimpleComponent._setControlElementCssMapInfo = function ()
    {
        var enabledselector = this._cssselector.enabled;
        if (enabledselector)
        {
            this._control_element.setElementCSSMapInfo(
                enabledselector.border,
                enabledselector.padding,
                enabledselector.edge);
        }
    };

    // [component.controlelement.init:possize]      // �̺κ� override�� basic component������
    _pSimpleComponent._initControlElementPositionSize = function ()
    {
        // calc arrange & adjust position
        this._calcArrangePosition();
        this._adjustPosition();

        // set pos/size
        this._control_element.setElementPosition(this._adjust_left, this._adjust_top);
        this._control_element.setElementSize(this._adjust_width, this._adjust_height);
    };

    // [component.controlelement.init:styleprop]    // �̺κ� override�� basic component������
    _pSimpleComponent._initControlElementStyleProps = function ()
    {
        this._initNormalStyleProprty(this._control_element); // TODO: �ҽ�����
    };

    // [component.controlelement:created]           // �̺κ� override�� basic component������
    _pSimpleComponent._createdControlElement = function (_window)
    {
        var controlElem = this._control_element;
        if (controlElem)
        {
            controlElem.create(_window);

        //  onCreatedControlElement();              // �� override ������ ����

            return controlElem.handle;
        }
        return null;
    };
 
    // [component.controlelement:destroy]           // �̺κ� override�� basic component������, ������ ����
    _pSimpleComponent._destroyControlElement = function ()
    {
        if (this._control_element)
        {
            this._control_element.destroy();
            this._control_element = null;
        }

        //  onDestroyControlElement();                  // �� override ������ ������ ����
    };


    //===============================================================
    // nexacro.SimpleComponent : Client Element
    //===============================================================

    // [SimpleComponent Component ó��]
    // BasicComponent ������ ClientElement �����ڵ�����
    // UserComponent�� ClientElement ���� Override �� �����ڵ� �Ұ�

    // TODO : ControlElement�� ClientElement�� ����

    // [component.clientelement:create]             // �̺κ� override�� basic component������
    _pSimpleComponent._createClientElement = function ()
    {
        // check parent
        var control_elem = this._control_element;
        if (control_elem)
        {
            // create client element
            this._onCreateClientElement(control_elem);

            // check client elements
            if (this._client_elem)
            {
                // init client elements
                this._initClientElement();
            }
        }
    };
    // [component.clientelement:create]             // �̺κ� override�� basic component������
    _pSimpleComponent._onCreateClientElement = function (parent_elem)
    {
        this._client_elem = new nexacro.IconTextElement(parent_elem);
    };

    // [component.clientelement:init]               // �̺κ� override�� basic component������
    _pSimpleComponent._initClientElement = function ()
    {
        this._initClientElementPositionSize();
        this._initClientElementStyleProps();
        this._initClientElementValueProps();
    };

    // [component.clientelement.init:possize]       // �̺κ� override�� basic component������
    _pSimpleComponent._initClientElementPositionSize = function ()
    {
        this._client_elem.setElementPosition(0, 0);
        this._client_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
    };

    // [component.clientelement.init:styleprop]     // �̺κ� override�� basic component������
    _pSimpleComponent._initClientElementStyleProps = function ()
    {
        if (this.textAlign)
            this._client_elem.setElementTextAlign(this.textAlign);
        if (this.verticalAlign)
            this._client_elem.setElementVerticalAlign(this.verticalAlign);
    };

    // [component.clientelement.init:valueprop]     // �̺κ� override�� basic component������
    _pSimpleComponent._initClientElementValueProps = function ()
    {
        // TODO : Basic Component�� ó��
        /*
  	    if (this.id)
  	        this._setClientElementText(this.id);
        */
    };

    // [component.clientelement:get]                // �̺κ� override�� basic component������
    _pSimpleComponent._getClientElement = function ()
    {
        return this._client_elem;
    };
    // [component.clientelement:set]                // �̺κ� override�� basic component������
    _pSimpleComponent._setClientElementText = function (text)
    {
        this._client_elem.setElementText(text);
    };

    // [component.clientelement:created]            // �̺κ� override�� basic component������, ������ ����
    _pSimpleComponent._createdClientElement = function (_window)
    {
        if (this._client_elem)
        {
            this._client_elem.create(_window);      // create? created?
        }

    //  onCreatedClientElement();                   // �� override ������ ����
    };
 
    // [component.clientelement:destroy]            // �̺κ� override�� basic component������, ������ ����
    _pSimpleComponent._destroyClientElement = function ()
    {
        if (this._client_elem)
        {
            this._client_elem.destroy();
            this._client_elem = null;
        }

    //  onDestroyClientElement();                   // �� override ������ ������ ����
    };

    //===============================================================
    // nexacro.SimpleComponent : Overflow
    //===============================================================

    // [Simple Component ó��]
    // Overflow�� Scroll/Expand ó���� �⺻ ������ ����
    // Simple������ ���� ���� ó�� ���� Complex���� ���� ó��

    // [component:init]                             // �̺κ� override�� Complex��
    _pSimpleComponent._initOverflow = function ()
    {
    };

    //===============================================================
    // nexacro.SimpleComponent : Contents
    //===============================================================

    // [Simple Component ó��]
    // �Ʒ��� Basic Component�� override ����
    // �� ���� Component�� ClientElement�� �����ڵ�����

    // [component.contents:init]                    // �̺κ� override�� basic component������. receate�� ó���ϱ� ���ؼ� contents create ����� �и�
    _pSimpleComponent._initContents = function ()
    {
        this.onCreateContents();                    // Simple Component�� Override ����

        this._is_created_contents = true;
        this._is_loading = false;
    };
    // [component.contents:created]                 // �̺κ� override�� basic component������      
    _pSimpleComponent._createdContents = function (_window)
    {
        this.onCreatedContents(_window);
    };

    // [component.contents:clear]                   // �̺κ� override�� basic component������
    _pSimpleComponent._clearContents = function ()
    {
        this.onClearContents();                     // Recreate ó���� ���� Content Clear�� ���⼭ ��� ó��
    };

    // [component.contents:set]                     // �̺κ� override�� basic component������   
    _pSimpleComponent._setContents = function (strContents)
    {
        this._onSetContents(strContents);           // Contents ����ÿ� Override 
    };

    // [���� Component ó��]
    // �Ʒ��� �� Component���� override ����
    // �� ���� Component�� ClientElement�� �����ڵ�����

    // [component.contents:create]                  // Contents ����ÿ� Override       
    _pSimpleComponent.onCreateContents = function (created)
    {
        this._createClientElement();
    };

    // [component.contents:created]                 // TODO: onCreatedContents�� �ҽ�����        
    _pSimpleComponent.on_created_contents = function (_window)
    {
        this.onCreatedContents(_window);
    };
    // [component.contents:created]                 // Contents ����ÿ� Override             
    _pSimpleComponent.onCreatedContents = function (_window)
    {
        this._createdClientElement(_window);
    };

    // [component.contents:clear]                   // Contents ����ÿ� Override          
    _pSimpleComponent.onClearContents = function ()
    {
        this._destroyClientElement();
    };
    // [component.contents:destory]                 // �̺κ� override�� basic component������
    _pSimpleComponent.onDestroyContents = function ()
    {
        this._clearContents();                      // Recreate ó���� ���� ClearContents�� ��� ó��
    };

    // [component.contents:set]                     // Contents ����ÿ� Override 
    _pSimpleComponent._onSetContents = function (strContents)
    {
         
    };

    //===============================================================
    // nexacro.SimpleComponent : Recreate
    //===============================================================

    // [���� Component ó��]
    // Recreate ó���� Component�� ���Ͽ� �߰�ó��


    // [component.contents:recreate]                
    _pSimpleComponent._recreateContents = function ()
    {
        this._clearContents();
        this._initContents();
        this._createdContents(this._getWindow());

        this._recalcLayout(true);
    };
    // [component:recreate]                         
    _pSimpleComponent._recreateComponent = function ()
  	{
  	    this.destroyComponent();
  	    this.createComponent();
  	};
    // [object:recreate]                           
    _pSimpleComponent._recreate = function ()
  	{
  	    this.destroy();
  	    this.create();
  	};

    // [���� Component ó��]
    // Recreate Logic�� ������ Basic Component�� ���Ͽ� Override



    //===============================================================
    // nexacro.SimpleComponent : Create Command/Handle
    //===============================================================

    // [���� Component ó��]
    // Command/Attach�� Contents ������ ���� �����ǵ��� ����
    // SimpleComponent ������ Element Command/Attach �ڵ�����

    // [component:createcommand]   
    _pSimpleComponent.createCommand = function ()     // TODO:�ҽ�����
    {
        return this._createCommand();
    };
    _pSimpleComponent.attachHandle = function (win)   // TODO:�ҽ�����
    {
        return this._attachHandle(win);
    };

    // [component:createcommand]                    
    _pSimpleComponent._createCommand = function ()
    {
        var str = "";
        var controlElem = this._control_element;
        if (controlElem && !this._is_loading)
        {
            // prepare command
            this.onPrepareCommand();

            // get command
            var str = controlElem.createCommandStart();
            if (str)
            {
                str += this.onCreateContentsCommand();  // Basic Component������ Override
                str += controlElem.createCommandEnd();
            }

            this._is_create_commandstr = true;
        }
        return str;
    };

    // [component.contents:preparecommand]           
    _pSimpleComponent.onPrepareCommand = function ()
    {
        // apply propeties for command
        this._applyProperties();

        // apply position for command
        this._update_position();

        // apply layout for command
        this._recalcLayout(true);
    };

    // [component.contents:createcommand]           
    _pSimpleComponent.onCreateContentsCommand = function ()
    {
        return this._client_elem ? this._client_elem.createCommand() : "";
    };

    // [component:attachhandle]                     
    _pSimpleComponent._attachHandle = function (win)
    {
        if (!this._is_created && this._is_create_commandstr)
        {
            // attach handle
            this.onAttachControlHandle(win);            // Basic Component������ Override
            this.onAttachContentsHandle(win);           // Basic Component������ Override

            // apply status for command
            this._resetStatus();

            // created
            this._is_created = true;
        }
    };

    // [component.control:attachhandle]            
    _pSimpleComponent.onAttachControlHandle = function (win)
    {
        var controlElem = this._control_element;
        if (controlElem)
        {
            controlElem.attachHandle(win);
        }
    };
    // [component.contents:attachhandle]            
    _pSimpleComponent.onAttachContentsHandle = function (win)
    {
        var clientElem = this._client_elem;
        if (clientElem)
        {
            clientElem.attachHandle(win);
        }
    };
 
    // [���� Component ó��]
    // Command/Attach�� Contents �� �����ϰ� �ִ��� �ڵ�ó���ǵ��� ó��
    // UserComponent������ Element�� Command/Attach �Ұ�, Control�� ����


    //===============================================================
    // nexacro.SimpleComponent : Layout/Recalc
    //===============================================================

    // [Simple Component ó��]
    // RecalcLayout���� ��� ����ó��
    // RTL�� ���� ����
    // SimpleComponent������ �׻� 100%������ ���� Override�� ����
    // AutoSize �κ��� ���� �ڵ�ó���� UserComponent���� ó�� ����

    // TODO:�ҽ�����
    _pSimpleComponent.on_change_containerPos = function (left, top)
    {
        this._onChangeContainerPos(left, top);
    };
    _pSimpleComponent.on_change_containerRect = function (width, height)
    {
        this._onChangeContainerRect(width, height);
    };

    // [component.layout:setpos]                    // SimpleComponent������ Override ����
    _pSimpleComponent._onChangeContainerPos = function (left, top)
    {
    //  this._setContainerPos(left, top);
    };

    // [component.layout:setsize]                   // SimpleComponent������ Override ����
    _pSimpleComponent._onChangeContainerRect = function (width, height)
    {
        this._setContainerSize(width, height);

        this._recalcLayout(false);
    };

    // [component.layout.container:pos]             // SimpleComponent������ Override ����
    _pSimpleComponent._setContainerPos = function (left, top)
    {
        var client_elem = this._client_elem;
        if (client_elem)
        {
            client_elem.setElementPosition(left, top);
        }
    };
    // [component.layout.container:size]            // SimpleComponent������ Override ����
    _pSimpleComponent._setContainerSize = function (width, height)
    {
        var client_elem = this._client_elem;
        if (client_elem)
        {
            client_elem.setElementSize(width, height);
        }
    };

    // [component.layout:recalc]                    // SimpleComponent������ ������� ����
    _pSimpleComponent._recalcLayout = function (reset)
    {
        if (this._is_created || reset)   // TODO: RecalcLayout ó����� Component Status ó��
        {
            this._onRecalcLayout(reset);
        }
    };


    // [���� Component ó��]
    // SimpleComponent������ Override ����

    // [component.layout:recalc]                    // SimpleComponent������ ������� ����
    _pSimpleComponent._onRecalcLayout = function (reset)
    {
    };



    //===============================================================
    // nexacro.SimpleComponent : ValueBind/Expr
    //===============================================================

    // [Simple Component ó��]
    // value bind�� �⺻���� ����

    // [component.bind.valuebind:initprop]   
    _pSimpleComponent._is_valuebind = false;
    // [component.expr.valueexpr:initprop]   
    _pSimpleComponent._is_valueexpr = false;


    // [component.bind:init]                   
    _pSimpleComponent._initBind = function ()
    {
    };
    // [component.bind:initinfo]                   
    _pSimpleComponent._initBindInfo = function ()
    {
    };
    // [component.bind:clear]    
    _pSimpleComponent._clearBind = function ()
    {
    };

    // [component.expr:init]                   
    _pSimpleComponent._initExpr = function ()
    {
        if (this._is_valueexpr)
        {
            // [component.expr:create]
            this._exprdata = new nexacro._ExprData(true, false, false);

            // [component.expr:init]
            this._exprdata._initExprParser();
            this._exprdata._initExprTarget(this);
        }
    };
    // [component.expr:initinfo]                   
    _pSimpleComponent._initExprInfo = function ()
    {
        if (this._is_valueexpr)
        {
            // [component.expr.exprinfo:apply]
            this._applyExprInfos();

            // [component.expr.value:apply]
            this._applyValue();
        }
    };
    // [component.expr:applyinfo]                   // override �ּ�ȭ
    _pSimpleComponent._applyExprInfos = function ()
    {
        if (this._exprdata)
        {
            // [component.expr.exprinfo:set]
            this._exprdata._setExprInfos(this._onGetExprInfos());
        }
    };
    // [component.expr:clear]    
    _pSimpleComponent._clearExpr = function ()
    {
        if (this._exprdata)
        {
            this._exprdata._clear();
            delete this._exprdata;
            this._exprdata = null;
        }
    };

    // [component.expr.cache:get]    
    _pSimpleComponent._getExprFuncByCtx = function (ctx)
    {
        if (this._exprdata)
        {
            return this._exprdata.getExprFuncByCtx(ctx);
        }
    };
    // [component.expr.cache:set]    
    _pSimpleComponent._setExprFuncByCtx = function (ctx, func)
    {
        if (this._exprdata)
        {
            return this._exprdata.setExprCacheIdx(ctx, this._exprdata.setExprFunc(ctx, func));
        }
    };

    // [component.expr.info:create]
    _pSimpleComponent.createExprInfo = function (baseid, targetid, targetprop, exprprop)
    {
        var exprinfo = new nexacro._ExprInfo();

        if (exprinfo)
        {
            exprinfo.baseid = baseid;
            exprinfo.target = nexacro._nvl(targetid, false) ? targetid.split('.') : null;
            exprinfo.setter = nexacro._nvl(targetprop, false) ? "set_" + targetprop : "set_text";
            exprinfo.exprid = nexacro._nvl(exprprop, false) ? exprprop : this._onGetExprProp();
        }

        return exprinfo;
    };
    // [component.bind.databind:init]               // expr�� override
    _pSimpleComponent._onGetExprProp = function ()
    {
        return "expr";
    };

    // [component.expr.dataexpr:init]               // dataexpr�� override
    _pSimpleComponent._onGetExprInfos = function ()
    {
        if (this._is_valueexpr)
            return [this.createExprInfo()];

        return null;
    };

    // [component.bind.valuebind:initprop]          // value property�� ���ų� �ٸ� property�� ó���� override
    _pSimpleComponent._onGetBindableProperties = function ()      // �� Properties ������??
    {
        return "value";
    };

    // [component.bind.valuebind:initbind]          // TODO: �ҽ�����             
    _pSimpleComponent.on_init_bindSource = function (columnid, propid, ds)
    {
        return this._onInitBindSource(columnid, propid, ds);
    };
    // [component.bind.valuebind:initbind]
    // [component.bind.valueexpr:initexpr]
    _pSimpleComponent._onInitBindSource = function (columnid, propid, ds)
    {
        if (this._is_valuebind && propid == this._onGetBindableProperties())
        {
            this._setValue(undefined);
            this._applyVaule();
        }
        if (this._is_valueexpr && propid == this._onGetExprProperty())
        {
            this._setValue(undefined);
            this._applyVaule();
        }
    };

    // [component.bind.valuebind:changebind]        // TODO: �ҽ�����                 
    _pSimpleComponent.on_change_bindSource = function (propid, ds, row, col, index)
    {
        return this._onChangeBindSource(propid, ds, row, col, index);
    };
    // [component.bind.valuebind:changebind]                  
    _pSimpleComponent._onChangeBindSource = function (propid, ds, row, col, index)
    {
        if (this._is_created)
        {
            if (this._is_valuebind && propid == this._onGetBindableProperties())
            {
                this._setValue(ds.getColumn(row, col));
                this._applyValue();
            }
            if (this._is_valueexpr && propid == this._onGetExprProperty())
            {
                this._setValue(this._getExprData(row));
                this._applyValue();
            }
        }
    };

    // [component.bind.valuebind:valuetobind]               
    _pSimpleComponent._applyToBindSource = function (propid, Val)
    {
        if (!this._bind_event)
            return true;

        var evt =
		{
		    propid: propid,
		    val: Val
		};
        var ret = this._bind_event._fireEvent(this, evt);
        return ret;
    };

    // [component.bind.valuebind:set]                  
    _pSimpleComponent._setValue = function (v)
    {
        this[this._onGetBindableProperties()] = v;
    };

    // [component.bind.valuebind:get]                  
    _pSimpleComponent._getValue = function (v)
    {
        return this[this._onGetBindableProperties()];
    };

    // [component.bind.valuebind:applyvalue]                  
    _pSimpleComponent._applyValue = function ()
    {
        this.on_apply_value();
    };

    // [component.bind.valuebind:applyvalue]        // ValueBind�� Override                  
    _pSimpleComponent.on_apply_value = function ()
    {
        if (this._client_elem)
        {
            var value = this._getValue();
            if (value != undefiend && value != null)
            {
                this._client_elem.setElementText(value);
            }
        }
    };


    // [���� Component ó��]
    // value bind ó���� override
    /*
    // [component.bind.valuebind:initprop]          // value property�� ���ų� �ٸ� property�� ó���� override
    _pSimpleComponent._onGetBindableProperties = function ()
    {
        return "value";
    };

    // [component.bind.valuebind:valuetobind]               
    _pSimpleComponent.updateToDataset = function ()
    {
        return this._applyToBindSource(this._onGetBindableProperties(), this.value);
    };
    */


    //===============================================================
    // nexacro.ComplexComponent : Select (Single/Multi)
    //===============================================================

    // [���� Component ó��]
    // Select ���� Interface ����
    // Select�� Single/Multi ���δ� Component�� Simple/Complex ���ο� ����
    // Select�� ���������� �� Component�� ������ ����

    // [component.select:init]                      
    _pSimpleComponent._use_select = false;                  // Select ������ ����
    _pSimpleComponent.selectdragmode = "default";           // Scroll/Drag ���������� �߰�

    // [component.select:get]
    _pSimpleComponent.getSelect = function ()
    {
        return this._onGetCurrentSelect();
    };
    // [component.select:set]
    _pSimpleComponent.setSelect = function (select, subselect)
    {
        return this._onSetCurrentSelect(this._onGetSelectArgument(select, subselect));
    };
    // [component.select:clear]
    _pSimpleComponent.clearSelect = function ()
    {
        return this._onClearCurrentSelect();
    };
    // [component.select:check]
    _pSimpleComponent.isAboveSelected = function (idx1, idx2)
    {
        return this._onCheckAboveCurrentSelect(idx1, idx2);
    };

    // [component.select:init]                   
    _pSimpleComponent._initSelect = function ()
    {
        if (this._use_select)
        {
            this._selectinfo = new nexacro._SelectInfo();

            this._selectinfo._setSelectEvent(this);

            this._onInitSelect();
        }
    };
    _pSimpleComponent._onInitSelect = function (selecttype, positcount, rangecount, multicount, unselvalue)
    {
        if (this._selectinfo)
        {
            // TODO : Simple Component �⺻ Select ���� ó�� ����
            // edit  : text
            // value : value
            // control : comp

            this._selectinfo._initSelect(nexacro._SelectConst.SELECTTYPE_COMP, positcount, rangecount, multicount, unselvalue);
        }
    };

    // [component.select:clear]    
    _pSimpleComponent._clearSelect = function ()
    {
        this._onClearSelect();

        if (this._selectinfo)
        {
            this._selectinfo._clear();
            delete this._selectinfo;
            this._selectinfo = null;
        }
    };
    _pSimpleComponent._onClearSelect = function ()
    {
    };


    // [component.select:argument]
    _pSimpleComponent._onGetSelectArgument = function (select, subselect)
    {
        return select;
    };
    // [component.select:get]
    _pSimpleComponent._onGetCurrentSelect = function ()
    {
        if (this._selectinfo) return this._selectinfo._getCurrentSelect();
    };
    // [component.select:set]
    _pSimpleComponent._onSetCurrentSelect = function (select)
    {
        // TODO: SelectType�� Select Status ����ó��

        if (this._selectinfo) return this._selectinfo._setCurrentSelect(select);
    };
    // [component.select:clear]
    _pSimpleComponent._onClearCurrentSelect = function ()
    {
        // TODO: SelectType�� Select Status ����ó��

        if (this._selectinfo) return this._selectinfo._clearCurrentSelectPos();
    };
    // [component.select:check]
    _pSimpleComponent._onCheckAboveCurrentSelect = function (idx1, idx2)
    {
        if (this._selectinfo) return this._selectinfo._checkAboveCurrentSelect(idx1, idx2);
    };


    // [component.select:event]
    _pSimpleComponent._onChangeSelect = function (obj, type, oldvalue, newvalue)
    {
        this._on_basic_onselect(oldvalue, newvalue);
        this._on_fire_onselect(oldvalue, newvalue);
        this._on_default_onselect(oldvalue, newvalue);
    };

    // [component.select.event.onselect:fireevent]
    _pSimpleComponent._on_fire_onselect = function (oldvalue, newvalue)
    {
        if (this.onselect && this.onselect._has_handlers)
        {
            /* TODO : basic change event info
            // [component.eventinfo:create]         // User EventInfo �ڵ�
            var evt = new nexacro.ChangeEventInfo(this, "onselect", oldvalue, newvalue);
            
            this.onselect._fireEvent(this, evt);
            */
            this.onselect._fireEvent(this, null);
        }
        return true;
    };
    // [component.select.event.onselect:basicaction]
    _pSimpleComponent._on_basic_onselect = function (oldvalue, newvalue)
    {
        if (this._selectinfo)
        {
            // Select Complex Comp Status
            switch (this._selectinfo._selecttype)
            {
                case 0x04 : // nexacro._SelectConst.SELECTTYPE_COMP:
                {
                    // Select Status
                    if (this._use_selected_status)
                    {
                        this._changeUserStatus("selected", newvalue ? true : false);
                    }

                    return;
                }
                case 0x02: // nexacro._SelectConst.SELECTTYPE_TEXT:
                {
                    return;
                }
                case 0x01: // nexacro._SelectConst.SELECTTYPE_VALUE:
                {
                    return;
                }
                case 0xFF: // nexacro._SelectConst.SELECTTYPE_USER:
                {
                    return;
                }
            }
        }
    };
    // [component.select.event.onselect:defaultaction]
    _pSimpleComponent._on_default_onselect = function (oldvalue, newvalue)
    {
    };


    //===============================================================
    // nexacro.SimpleComponent : Interface Logic Override
    //===============================================================

    // [Simple Component ó��]
    // �ش� interface�� ������ �䱸�ɶ� Override ó��

    // [component.dlgcode:init]                     // dlgcode ������ ������ �ʿ��ϸ� override, default�� ��� false
    _pSimpleComponent._onGetDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        return { want_tab: true, want_return: true, want_escape: true, want_chars: true, want_arrows: true };
    };

    // [component.dragdrop:getdragdata]             // drag ���� drag data
    _pSimpleComponent._onGetDragData = function ()
    {
        return this.id;
        //  return this.getSelectedText();
    };

    // [component.tabstop:get]                      // Accessibility �� ���� ó���� override
    _pSimpleComponent._onGetTabstop = function ()
    {
        // [component.accessibility.tabstop:get]
        if (nexacro._enableaccessibility)
        {
            var accessibility = this.accessibility;
            if (accessibility && accessibility.enable && accessibility.role == "link")
                return true;
        }
        return false;
    };

    // [component.focus:get]                        // Accessibility �� ���� ó���� override
    _pSimpleComponent._onGetFocusAcceptable = function ()
    {
        // [component.accessibility.focus:get]
        return nexacro._enableaccessibility;
    };

    // [component.hotkey:init]                      
    _pSimpleComponent._initHotKey = function (keycode, altKey, ctrlKey, shiftKey)
    {
        if (!this._is_subcontrol)
            this._registerHotkey();
    };
    // [component.hotkey:clear]                      
    _pSimpleComponent._clearHotKey = function ()
    {
        if (!this._is_subcontrol)
            this._unregisterHotkey();
    };
    // [component.hotkey:action]                    // hotkey �⺻ Action ����� override
    _pSimpleComponent._onHotkey = function (keycode, altKey, ctrlKey, shiftKey)
    {
        // [component.hotkey:action]
        this.click();
    };

    //===============================================================
    // nexacro.SimpleComponent : RTL/Locale (��������)
    //===============================================================

    // [���� Component ó��]
    // Simple Component�� RTL/Locale�� ClientElement ������θ� ó��
    // Basic Component������ ó���Ǹ� User Component������ ���� ó���� ����.

    // �� ���� �߰�


    // [���� Component ó��]
    // Basic Component������ RTL Interface �Ϻ� Override ó��

    // �� ���� �߰�


    //===============================================================
    // nexacro.SimpleComponent : Status
    //===============================================================

    // [Simple Component ó��]
    // ���´� �⺻������ Basic Component���� ��� �����ϵ��� ����
    // User Component������ �߰��� UserStatus�� ��븸 �ڵ��ϸ� Metainfo���� ����
    // ������� ���¸� �߰��Ϸ��� Property/Method Interface�� �̿��Ͽ� ó���Ѵ�.

    // [component.status:init]
    _pSimpleComponent._initStatus = function ()     // Basic Component ���� Override
    {
        /*
        this._sysstatus = null;                     // Stock Sys Status �� ����� ����
        this._usrstatus = null;                     // Stock Usr Status �� ����� ����
        */
        this._onInitStatus();                       // User Status �߰��� Override
    };

    // [component.status:init]                      // User Component�� �� Override�� ���� ������� ����
    _pSimpleComponent._onInitStatus = function ()
    {
        // status init logic
        /*
        this._sysstatus = null;                     // Stock Sys Status �� ����� ����
        this._usrstatus = null;                     // Stock Usr Status �� ����� ����
        */
    };

    // [component.status:reset]                     // User Component�� �� Override�� ���� ������� ����
    _pSimpleComponent._resetStatus = function ()    
    {
        this._resetSysStatus();
        this._resetUserStatus();
    };
    // [component.status.sys:reset]                 // Override ����
    _pSimpleComponent._resetSysStatus = function ()
    {
        return this._onResetSysStatus();
    };
    // [component.status.user:reset]                // Override ����
    _pSimpleComponent._resetUserStatus = function ()         
    {
        return this._onResetUserStatus();
    };

    // [component.status:onreset]                   // �⺻ SysStatus Check Logic�� �ٸ� Basic Component ������ Override
    _pSimpleComponent._onResetSysStatus = function ()
    {
        // check real sys status
                                        this._onResetSysEnable();
        if (this._use_readonly_status)  this._onResetSysReadOnly();

        /*
        if (this._use_parent_mouseover) this._onResetSysMouseOver();
        if (this._use_parent_focused)   this._onResetSysFocused();
        if (this._use_parent_activate)  this._onResetSysActivate();
        */
    };
    // [component.status:onchange]                  // �⺻ UserStatus Check Logic�� �ٸ� Basic Component ������ Override
    _pSimpleComponent._onResetUserStatus = function (status, value)
    {
        // check real user status
        /*
        if (this._use_parent_usrstat1)  this._onResetUserStatus1();
        */
    };

    // [component.status.reset:enable]
    _pSimpleComponent._onResetSysEnable = function ()
    {
        // check real sys status
        var parent = this.parent;
        if (parent)
        {
            this._real_enable = parent._real_enable != false && this.enable;
            this._changeSysStatus("disabled", !this._real_enable);
            this._spreadSysStatus("disabled", !this._real_enable);
        }
    };
    // [component.status.reset:readonly]
    _pSimpleComponent._onResetSysReadOnly = function ()
    {
        // check real sys status
        var parent = this.parent;
        if (parent)
        {
            this._real_readonly = parent._real_readonly == true || this.readonly;
            this._changeSysStatus("readonly", this._real_readonly);
            this._spreadSysStatus("readonly", this._real_readonly);
        }
    };
    // [component.status.reset:userstat]
    /*
    _pSimpleComponent._onResetUserStatus1 = function ()
    {
        // check real user status
        var parent = this.parent;
        if (parent)
        {
            this._real_userstat = parent._real_userstat || this.userstat;
            this._changeUserStatus("userstat", this._real_userstat);
            this._spreadUserStatus("userstat", this._real_userstat);
        }
    };
    */

    // [component.status.sys:change]                // Override ����
    _pSimpleComponent._changeSysStatus = function (status, value)
    {
        return this._onChangeSysStatus(status, value);
    };
    // [component.status.user:change]               // Override ����
    _pSimpleComponent._changeUserStatus = function (status, value)         
    {
        return this._onChangeUserStatus(status, value);
    };

    // [component.status:onchange]                 // �⺻ SysStatus Change Logic�� �ٸ� Basic Component ������ Override
    _pSimpleComponent._onChangeSysStatus = function (status, value)
    {
        /*
        this._on_changeStatus(status, value);      // TODO:�ҽ�����  
        */

        this._oldstatus = this._status;
        this._statusmap[status] = value;

        var statusmap = this._statusmap;
        var applystatus = "enabled";

        if (statusmap.disabled)
            applystatus = "disabled";
        else if (statusmap.readonly && this._use_readonly_status)
            applystatus = "readonly";
        else if (statusmap.mouseover)
            applystatus = "mouseover";
        else if (statusmap.focused)
            applystatus = "focused";
        else if (statusmap.deactivate)
            applystatus = "deactivate";

        //this._status = applystatus;
        this._status = this.on_changeStatus(status, value, applystatus, this._status, this._userstatus);

        //������ ���콺 �ٿ��� �巡���ؼ� ��ư���� �ö����� // TODO : Sys Real Status ����ó���� Element Layer���� ó��
        if (this._status == "mouseover" && nexacro._cur_track_info)
            return;

        if (this._oldstatus != this._status)
            this._apply_status_toelement(this._oldstatus, this._status, this._olduserstatus, this._userstatus);

        if (nexacro._enableaccessibility)
            this._setAccessibilityStatFlag(this._status, this._userstatus);

    };
    // [component.status:onchange]                 // �⺻ UserStatus Change Logic�� �ٸ� Basic Component ������ Override
    _pSimpleComponent._onChangeUserStatus = function (status, value)
    {
        /*
        this._on_changeUserStatus(status, value); // TODO:�ҽ�����  
        */

        this._olduserstatus = this._userstatus;
        this._userstatusmap[status] = value;

        var statusmap = this._userstatusmap;
        var applystatus = "";

        if (this._use_pushed_status && statusmap.pushed)
            applystatus = "pushed";
        else if (this._use_selected_status && statusmap.selected)
            applystatus = "selected";

        this._userstatus = this.on_changeUserStatus(status, value, applystatus, this._status, this._userstatus);

        if (this._olduserstatus != this._userstatus)
            this._apply_status_toelement(this._oldstatus, this._status, this._olduserstatus, this._userstatus);

        if (nexacro._enableaccessibility)
            this._setAccessibilityStatFlag(this._status, this._userstatus);
    };

    // [component.status:clear]                 // Clear ó���� Override
    _pSimpleComponent._clearStatus = function ()
    {
    };

    /*
    // [component.logic:statuschange]               // User Status�� ����� �������� _changeUserStatus ȣ��� ó��
    _pSimpleComponent._userLogic = function ()
    {
        // [object.status:change] 
        this._changeUserStatus("userstatus1", true);// �� User Status ���� Metainfo�� ����Ǿ�� ��
        this._changeUserStatus("userstatus2", true);
    };
    */

    // [object.status:spread] 
    _pSimpleComponent._spreadStatus = function (statusname, statusstat)
    {
    };
    _pSimpleComponent._spreadSysStatus = function (statusname, statusstat)
    {
        return this._spreadStatus(statusname, statusstat);
    };
    _pSimpleComponent._spreadUserStatus = function (statusname, statusstat)
    {
        return this._spreadStatus(statusname, statusstat);
    };

    //===============================================================
    // nexacro.ComplexComponent : Enable (Disabled)
    //===============================================================

    // [component.disabled:init]
    /*
    _pSimpleComponent._is_disabled_control = false;         // �⺻ system status
    _pSimpleComponent._use_disabled_status = false;         // �⺻ system status
    _pSimpleComponent.enable = true;                        // �⺻ system status

    _pSimpleComponent.set_enable = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.enable = v;
            this.on_apply_prop_enable(v);
        }
    };
    */

    _pSimpleComponent.on_apply_prop_enable = function (enable)
    {
        this._changeStatus("disabled", !enable);
        this._spreadStatus("disabled", !enable);
    };

    _pSimpleComponent._isEnable = function ()
    {
        return this.parent ? this.parent._real_enable && this.enable : this.enable;
    };
    _pSimpleComponent._isDisable = function ()
    {
        return !this._isEnable();
    };

    //===============================================================
    // nexacro.ComplexComponent : Edit (Editable/ReadOnly)
    //===============================================================

    // [���� Component ó��]
    // Editable/ReadOnly ���� Interface ����
    // Edit�� ���� ó���δ� Component�� ����
    // Readonly Property�� Stats�� �ϰ�����

    // [component.editable:init]                      
    _pSimpleComponent._is_editable_control = false;         // Editable ������ ����
    _pSimpleComponent._use_readonly_status = false;         // readonly ������ ����
    _pSimpleComponent.readonly = undefined;                 // readonly ������ true/false ����

    _pSimpleComponent.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v !== this.readonly || v !== this._real_readonly)
        {
            this.readonly = v;
            this._real_readonly = this.readonly || (this.parent ? (this.parent._real_readonly ? true : false) : false);

            this.on_apply_readonly(this._real_readonly);
        }
    };
    _pSimpleComponent.on_apply_readonly = function (readonly)
    {
        this._changeStatus("readonly", readonly);
        this._spreadStatus("readonly", readonly);
    };

    _pSimpleComponent._isReadOnly = function ()
    {
        return this._is_editable_control && this.readonly == true || this._real_readonly == true;
    };
    _pSimpleComponent._isEditable = function ()
    {
        return this._is_editable_control && this.readonly != true && this._real_readonly != true;
    };
    _pSimpleComponent._isEditableComponent = function ()
    {
        return this._is_editable_control || this.readonly !== undefined;
    };
    _pSimpleComponent._checkProcessedKey = function (keycode, alt_key, ctrl_key, shift_key, check_comp, refer_comp)
    {
        return check_comp && refer_comp && refer_comp._isEditableComponent() && refer_comp._isEnable() && check_comp._isEnable();
    };

    //===============================================================
    // nexacro.SimpleComponent : Property
    //===============================================================

    // [�⺻ Component ó��]
    // Component Stock�̳� ���� Componnet�� DefaultValue�� �ٲٰ��� �ϸ� Override �Ͽ� ó��

    // [component.property:init]
    _pSimpleComponent._initProperties = function ()
    {
        /*
        this.stock_prop1 = DEFAULT_VALUE;           // �� property�� ��ӵǴ� �ʱⰪ ����ó��
        this.stock_prop2 = DEFAULT_VALUE;           
        */

        // TODO : Init Prop ���� üũ
        // [component.property:init]
        this.onInitProperties();                    // Property �߰�ó���� Override

        // [component.property:initvalue]
        this._onInitValueProp();                    // InitValue Init
    };
    // [component.property:apply]
    _pSimpleComponent._applyProperties = function ()
    {
        // stock prop
        if (this._taborder >= 0)
            this.on_apply_prop_taborder();
        if (this.tooltiptext)
            this.on_apply_prop_tooltip();
        if (this.positionstep)
            this.on_apply_positionstep(this.positionstep);  // TODO:argument ����
        if (this._hittest_type)
            this.on_apply_hittesttype(this._hittest_type);  // TODO:argument ����
        /*
  	    if (this.stock_prop1)
      	    this.on_apply_stock_prop1();           
  	    if (this.stock_prop2)
            this.on_apply_stock_prop2();
        */

        // override prop
        this.onApplyProperties();                  // Property �߰�ó���� Override
    };
    // [component.property:clear]
    _pSimpleComponent._clearProperties = function ()
    {
        /*
        this.on_clear_stock_prop1();                // Component Stock Normal Property Clear
        this.on_clear_stock_prop2();
        */
        this.onClearProperties();                  // ������ clear ó���� Override
    };

    // [�⺻ Component ó��]
    // ���� Proeprty ó��
    // Primitive�� Property�̸� ������ ó��
    // new/delete�� �䱸�Ǵ� Property�̸� ����/�������� ó��

    // [component.property.initvalue:init]          // initvalue ó��, no override, TODO:�ҽ�����
    _pSimpleComponent._onInitValueProp = function ()
    {
    //  this._on_apply_setpropinitfn();             // InitValue Init
    };

    // [component.property.peripheral:init]         // ���ӿ� Property �߰��� Override
    _pSimpleComponent.onInitProperties = function ()
    {
        /*
        this.property1 = true;
        this.property2 = false;
        this.property3 = false;
        */
    };
    // [component.property.peripheral:apply]        // ���ӿ� Property �߰��� Override
    _pSimpleComponent.onApplyProperties = function ()
    {
        /*
        this.on_apply_property1();
        this.on_apply_property2();
        this.on_apply_property3();
        */
    };
    // [component.property.peripheral:clear]        // ���ӿ� Property �߰��� ������ clear ó���϶� Override
    _pSimpleComponent.onClearProperties = function ()
    {
        // clear property
        /*
        this.on_clear_property1();
        this.on_clear_property2();
        this.on_clear_property3();
        */
    };

    /*
    // [component.property:init]
    _pSimpleComponent.proeprty1 = true;

    // [component.property:set]                     // readonly �ƴ� Property �߰��� ����
    _pSimpleComponent.set_property1 = function (v)
    {
        // property check
        if (this.property1 != v)
        {
            // property set & type value check
            this.property1 = nexacro._toBoolean(v);

            // apply property
            this.on_apply_property1();
        }
    };

    // [object.property:apply]                      // readonly �ƴ� Property �߰��� ����
    _pSimpleComponent.on_apply_property1 = function ()
    {
        // property apply user logic
        if (this.property1)
        {
            ;
        }
    };

    // [object.property:clear]                      // ������ property ���� clear ó���� ����
    _pSimpleComponent.on_clear_property1 = function ()
    {
        // property clear user logic
        this.property1 = null;
    };
    */

    //===============================================================
    // nexacro.SimpleComponent : Methods
    //===============================================================

    // [���� Component ó��]
    // Method �߰� ó��
    // Status �� ��������� �߰��ϰ��� �Ҷ����� Proeprty/Method�� ó��

    /*
    // [method:call]
    _pSimpleComponent.click = function ()
    {
        // method user logic

        // [event:call]
        this.on_fire_event1("none", false, false, false, -1, -1, -1, -1, -1, -1, this, this);
    };

    // [method:get]
    _pSimpleComponent.getAMethod = function ()
    {
        // [property:get]
        return this._A;
    };

    // [method:set]
    _pSimpleComponent.setAStatus = function (v)
    {
        // [property:set]
        var ret = this._A;
        this._A = v;

        // [status:change]
        this._changeUserStatus("Status1", v);

        return ret;
    };
    */

    //===============================================================
    // nexacro.SimpleComponent : Events
    //===============================================================

    // [���� Component ó��]
    // �⺻ System Event Handler�� Basic Component���� ��� ó���ϸ� User Component���� ���� ������ �������� �ʴ´�.
    // ��� Event Handler�� Override ������ FireAction/DefaultAction/BasicAction Handler�� �����Ѵ�.
    // �̺�Ʈ �����߰��� ���� event_list�� �������Ͽ� �߰�
    // �̺�Ʈ ���������� ������, Metainfo������ ����ó��
    // EventInfo ����, Action ����� Override ó��
    // Element �ڵ�� �ݵ�� Basic Component������ ���

    // [component.event:init]
    _pSimpleComponent._initEvents = function ()     // Event �߰��� Override
    {
        this._event_list =
        {
            "onkillfocus": 1, "onsetfocus": 1,
            "oninput": 1, "onkeydown": 1, "onkeyup": 1,
            "onclick": 1, "ondblclick": 1,
            "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmousedown": 1, "onmouseup": 1,
            "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1,
            "onmousewheel": 1,
            "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
            "onmove": 1, "onsize": 1,
            "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1,
            "oncontextmenu": 1

            // [event:init]
            // "onnewevent": 1
        };

        // [event:init]
        // this._event_list["onnewevent"] = 1;

        // ���� Event �߰� ��� ������ �� Override�� ����
        // this._onInitEvents();                            
    };
 
    // ���� Event override
    // ������ �����ϰų� EventInfo�� �����Ҷ� Override�Ͽ� ó��
    /*
    // [component.clickevent:basicaction]
    _pSimpleComponent.on_click_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY)
    {
        // user basic action
    };
    // [component.clickevent:defaultaction]
    _pSimpleComponent.on_click_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY)
    {
        // user default action
    };
    // [component.clickevent:fireevent]
    _pSimpleComponent.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onclick && this.oneditclick._has_handlers)
        {
            // [component.eventinfo:create]         // User EventInfo �ڵ�
            var evt = new nexacro.MyClickEventInfo(this, "onclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
            return this.onclick._fireEvent(this, evt);
        }
        return true;
    };

    // [component.mouseevent:fireevent]             // Event Override (�� ��������?)
    _pSimpleComponent.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var rootComp = this._getRootComponent(from_comp);

            // [event:eventinfo]                    // User EventInfo �ڵ�
            var evt = new nexacro.UserMouseEventInfo(rootComp, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

            return this.onmouseup._fireSysEvent(this, evt);
        }
        return false;
    };
    // [component.mouseevent:fireevent]             // Event Override (�� ��������?)
    _pSimpleComponent.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var rootComp = this._getRootComponent(from_comp);

            // [component.eventinfo:create]         // User EventInfo �ڵ�
            var evt = new nexacro.UserMouseEventInfo(rootComp, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

            return this.onmouseup._fireUserEvent(this, evt);
        }
        return false;
    };
    */

    //===============================================================
    // nexacro.SimpleComponent : Accessibility (��������)
    //===============================================================

    // [Simple Component ó��]
    // ���ټ��� Interface �Ϻ� Override ó��
 
    // [component.accessibility:init]
    _pSimpleComponent._initAccessibility = function ()    // Basic Component ���� Override
    {
        this._accessibility_role = "RoleName";      // Basic Component ���� Role ����
    
        //  this._onInitAccessibility();                // User Accessibility ó���� Override
    };

    // [object.accessibility.role:get]
    _pSimpleComponent._getAccessibilityRole = function ()
    {
        var role = this.accessibilityrole ? this.accessibilityrole : this._accessibility_role;
        if (!role) role = "none";
        return role;
    };

    // [component.accessibility.label:get]
    _pSimpleComponent._getAccessibilityLabel = function ()
    {
        var label = this._getLinkedLabel(this.accessibilitylabel);
        return label ? label : this._onGetAccessibilityLabel();
    };

    // [component.accessibility:apply]
    _pSimpleComponent._applyAccessibility = function ()    // Basic Component ���� Override
    {
        if (nexacro._enableaccessibility)
            this.on_apply_accessibility();
    };
    // [component.accessibility:clear]
    _pSimpleComponent._clearAccessibility = function ()    // Basic Component ���� Override
    {
        if (nexacro._enableaccessibility)
        {
            var application = nexacro.getApplication();
            if (application && application._accessibilityHistoryList)
            {
                application._remove_accessibility_history(this);
            }
        }
    };

    // [���� Component ó��]
    // ���ټ��� Interface �Ϻ� Override ó��

    // [component.accessibility.label:get]
    _pSimpleComponent._onGetAccessibilityLabel = function ()
    {
        var label = this.text ? this.text : this.value;
        return label;
    };
    // [component.accessibility.role:getadd]
    _pSimpleComponent._onGetAccessibilityAdditionalRole = function ()
    {
        return " addrole";      // TODO:������� �߰��ǵ���
    };

    // �� ���� �߰�

    //===============================================================
    // nexacro.SimpleComponent : Inner Logic
    //===============================================================

    _pSimpleComponent._getParentElement = function ()
    {
        return (!this._is_window && this.parent) ? this.parent._control_element : null;
    };

    //===============================================================
    // nexacro.SimpleComponent : Util Logic
    //===============================================================

    _pSimpleComponent._clone = function ()
    {
        return nexacro._clone(this);
    };
    _pSimpleComponent._onCloneProperities = function (source)
    {
    };

    _pSimpleComponent._getSubArray = function (array, start, count)
    {
        var ret = [];
        for (var i = Math.max(start, 0), l = Math.min(start + count, array.length) ; i < l; i++)
        {
            ret.push(array[i]);
        }
        return ret;
    };

    delete _pSimpleComponent;
};


if (!nexacro._CompUtil) 
{
    //==============================================================================
    // nexacro._CompUtil for nexacro.SimpleComponent
    //==============================================================================

    // [�߰� Utility ó��]
    // SimpleComponent/ComplexComponent�� Utility Function Set

    nexacro._CompUtil = true;

    // [util.scope.global:get]                 // TODO:Get Runtime Global Scope
    nexacro._getGlobalScope = function ()
    {
        return nexacro.__getOSType ? null : window;
    };
    // [util.scope.nexacro:get]                // TODO:Get Runtime Custom Scope
    nexacro._getCustomScope = function (scope)
    {
        return nexacro; // eval(scope); 
    };

    // [util.scope.construct:get]          // TODO: Cache for Except Type Search
    nexacro._getTypeConstructor = function (_type, _deftype)
    {
        // check default type
        if (!_type) _type = _deftype;

        /*
        if (!_type.includes("."))               // TODO: Cache for Except String Search
        {
            // get type construct
            return nexacro[_type];
        }
        else
        */
        {
            // find constructor scope/type      // TODO: Cache for Except String Split & Type Search
            var parts = _type.split('.');
            var index = 0;
            var final = parts.length - 1;
            var tname = parts[final];
            var scope = nexacro._getGlobalScope(); // TODO: Check Dynamic Object Create All Browser

            if (!scope)
            {
                scope = nexacro._getCustomScope(parts[0]); // TODO: Check Custom Scope
                index = 1;
            }

            if (scope)
            {
                for (; index < final; index++)
                {
                    scope = scope[parts[index]];
                }

                return scope[tname];
            }
        }

        return null;
    };

    // [util.clone:clone]                       // TODO:Optimize
    nexacro._clone = function (obj)
    {
        // extends 'from' object with members from 'to'. 
        // If 'to' is null, a deep clone of 'from' is returned
        function extend(from, to)
        {
            if (from == null || typeof from != "object") return from;
            if (from.constructor != Object && from.constructor != Array) return from;
            if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
                from.constructor == String || from.constructor == Number || from.constructor == Boolean)
                return new from.constructor(from);

            to = to || new from.constructor();

            for (var name in from)
            {
                to[name] = typeof to[name] == "undefined" ? extend(from[name], null) : to[name];
            }

            return to;
        };

        return extend(obj);
    };

    // [util.saveImage]                // TODO:FullStyle
    var _use_savetoimage_runtime = false;
    var _use_savetoimage_html = false;

    if (nexacro._Browser == "Runtime" && _use_savetoimage_runtime || _use_savetoimage_html)
    {
        // [util.saveImage:drawelem]
        nexacro._drawElement2Canvas = function (canvas, elem, left, top)
        {
            if (canvas && elem)
            {
                var l = left || 0;
                var t = top || 0;

                var image = nexacro.__saveToImageObject(elem);
                if (image)
                {
                    canvas.drawImage(image, l, t, image.width, image.height);
                }
            }
        };
        // [util.saveImage:drawcomp]
        nexacro._drawComponent2Canvas = function (canvas, comp, left, top)
        {
            if (canvas && comp)
            {
                var l = left || 0;
                var t = top || 0;

                var image = nexacro.System.saveToImageObject(comp);
                if (image)
                {
                    canvas.drawImage(image, l, t, image.width, image.height);
                }
            }
        };
    }
    else
    {
        // [util.saveImage:getCurrentStyle]         // TODO:FullStyle
        nexacro._getCurrentStyleObject = function (elem)
        {
            if (!elem) return null;

            if (nexacro._Browser == "Runtime")
            {
                return { curr : null, elem : elem, type : "runtime" };
	        }
	        else
	        {
	            var _doc = elem._getRootWindowHandle();
	            var _win = _doc.defaultView || _doc.parentWindow;
	            var _cps = _win.getComputedStyle || 0;
	            var _obj = _cps ? _win.getComputedStyle(elem.handle) : node.currentStyle;

	            return _cps ? { curr: _obj, elem: elem, type: "compute" }
                            : { curr: _obj, elem: elem, type: "current" };
	        }
        };
        nexacro._getCurrentStyleValue = function (style, prop)
        {
            switch(prop)
            {
                case "font":
                {
                    if (style.type == "runtime")
                    {
                        return style.elem._getComputedStyle("font");
                    }
                    else
                    {
                        var font = [];
                        font.push(nexacro._getCurrentStyleValue(style, "font-style"));
                        font.push(nexacro._getCurrentStyleValue(style, "font-variant"));
                        font.push(nexacro._getCurrentStyleValue(style, "font-weight"));
                        font.push(nexacro._getCurrentStyleValue(style, "font-size"));
                        font.push(nexacro._getCurrentStyleValue(style, "font-family"));
                        return font.join(' ');
                    }
                }
                default:
                {
                    switch(style.type)
                    {
                        case "runtime":
                        {
                            var r = prop.split('-');
                            if (r.length > 1 && r[0] == "background")
                                return style.elem._getComputedStyleSubValue(r[0], prop);
                            else
                                return style.elem._getComputedStyleValue(prop);
                        }
                        case "current":
                        {
                            var r = prop.split('-');
                            for (var i = 1, l = r.length; i < l; i++)
                            {
                                var s = r[i];
                                if (s.length)
                                    s[0] = s[0].toUpperCase();
                            }
                            var p = r.join('');

                            return style.curr[p];
                        }
                        case "compute":
                        {
                            return style.curr.getPropertyValue(prop);
                        }
                    }
                }
            }
        };

        // [util.saveImage:drawelem]                // TODO:FullStyle
        nexacro._drawElement2Canvas = function (canvas, elem, left, top, optxt, opimg)
        {
            if (canvas && elem)
	        {
	            var l = left || 0;
	            var t = top || 0;
	            var w = elem.width;
	            var h = elem.height;

                // style
	            var style = nexacro._getCurrentStyleObject(elem);

                // clip
	            canvas.save();
	            canvas.beginPath();
	            canvas.rect(l, t, w, h);
	            canvas.clip();

	            switch(elem._type_name)
	            {
	                case "ControlElement":
	                case "ScrollableControlElement":
	                case "FrameControlElement":
	                case "GridScrollableControlElement":
	                case "GridBandControlElement":
	                case "GridRowControlElement":
	                {
	                    var border = elem.border ? elem.border : elem._border_info;
	                    var radius = elem.borderRadius ? elem.borderRadius : null;

                        // draw border
                        if (border)
                        {
                            var rx = radius ? radius.x : 0;
                            var ry = radius ? radius.y : 0;

                            if (rx && ry)
                            {
                                var s = border.top._width;
                                if (s)
                                {
                                    canvas._setLineStyle(border.top);
                                    canvas.drawStrokeInsetRoundRect(l, t, w, h, rx, ry);

                                    l += s; t += s;
                                    w -= s; h -= s;
                                }
                            }
                            else if (border._single)
                            {
                                s = border.top._width;
                                if (s)
                                {
                                    canvas._setLineStyle(border.top);
                                    canvas.drawStrokeInsetRect(l, t, w, h);

                                    l += s; t += s;
                                    w -= s; h -= s;
                                }
                            }
                            else
                            {
				                if (border.top._isValid())
				                {
				                    var s = border.top._width;
				                    var o = t + s / 2;
				                    canvas._setLineStyle(border.top);
				                    canvas.drawStrokeLine(l, o, l + w, o);
				                    t += s;
				                }
				                if (border.right._isValid())
				                {
				                    var s = border.right._width;
				                    var o = l + w - s / 2;
				                    canvas._setLineStyle(border.right);
				                    canvas.drawStrokeLine(o, t, o, t + h);
				                    w -= s;
                                }
				                if (border.bottom._isValid())
				                {
				                    var s = border.bottom._width;
				                    var o = t + h - s / 2;
				                    canvas._setLineStyle(border.bottom);
				                    canvas.drawStrokeLine(l, o, x + w, o);
				                    h -= s;
                                }
				                if (border.left._isValid())
				                {
				                    var s = border.left._width;
				                    var o = l + s / 2;
				                    canvas._setLineStyle(border.left);
				                    canvas.drawStrokeLine(o, t, o, t + h);
				                    l += s;
                                }
                            }
                        }
	                    // draw background
                        var bkcolor = nexacro._getCurrentStyleValue(style, "background-color");
                        var bkimage = nexacro._getCurrentStyleValue(style, "background-image");
                        var bkposit = nexacro._getCurrentStyleValue(style, "background-position");
                        var bkrepeat = nexacro._getCurrentStyleValue(style, "background-repeat");

                        if (bkrepeat)
                        {
                            if (bkimage && bkimage != "none")
                            {
                            //  canvas.createPattern();
                                canvas.drawImage(elem, 0, 0, image.width, image.height);
                            }
                            else
                            {
                            //  canvas.createPattern();
                                canvas.setElementFillStyle(nexacro.ColorObject(bkcolor));
                                canvas.drawFillRect(l, t, w, h);
                            }
                        }
                        else
                        {
                            if (bkimage && bkimage != "none")
                            {
                                var image;
                                canvas.drawImage(image, 0, 0, image.width, image.height);
                            }
                            else
                            {
                                canvas.setElementFillStyle(nexacro.ColorObject(bkcolor));
                                canvas.drawFillRect(l, t, w, h);
                            }
                        }

                        // draw edge
	                    break;
	                }
	                case "IconElement":
	                case "ImageElement":
	                {
	                    var drawImg = !opimg || opimg == "drawImg";
	                    var drawBox =  opimg && opimg == "drawBox";
	                    var align = false;

	                    // adjust align
	                    if (align && elem.parent_elem)
	                    {
	                        var pw = elem.parent_elem.width;
	                        var ph = elem.parent_elem.height;

	                        l += Math.max((pw - w) / 2, 0);
	                        t += Math.max((ph - h) / 2, 0);
                        }
	                    // draw Image/Icon
	                    if (drawImg)
	                    {
	                        if (style.type == "runtime")
	                        {
	                            var image = new nexacro.Image();
	                            if (elem.icon) image.set_src(elem.icon.value);
	                            if (elem.image) image.set_src(elem.image.url);

	                            canvas.drawImage(image, l, t, w, h);

	                            delete image;
	                            image = null;
	                        }
	                        else
	                        {
	                            canvas.drawImage(elem, l, t, w, h);
	                        }
                        }
	                    // draw box
                        if (drawBox)
                        {
                            canvas.setElementStrokeStyle(canvas.color);
                            canvas.drawStrokeInsetRect(l, t, w, h);
                        }

	                    break;
	                }
	                case "IconTextElement":
	                {
	                    var drawBox = elem._box_node || 0;
	                    var drawIco = elem._icon_node || elem.icon;
	                    var drawTxt = elem._text_node || elem.text;

	                    // draw box
                        if (drawBox)
                        {
	                        // draw background
                            var bkcolor = nexacro._getCurrentStyleValue(style, "background-color");
                            var bkimage = nexacro._getCurrentStyleValue(style, "background-image");
                            var bkposit = nexacro._getCurrentStyleValue(style, "background-position");

                            if (bkcolor)
                            {
                                canvas.setElementFillStyle(nexacro.ColorObject(bkcolor));
                                canvas.drawFillRect(l, t, w, h);
                            }
                            if (bkimage && bkimage != "none")
                            {
                                var image = new nexacro.Image();
                                image.set_src(bkimage);

                                var ix = l, iy = t;
                                var iw = image.width, ih = image.height;

                                if (bkposit && elem.parent_elem)
	                            {
	                                var pw = elem.parent_elem.width;
	                                var ph = elem.parent_elem.height;

	                                ix += Math.max((pw - iw) / 2, 0);
	                                iy += Math.max((ph - ih) / 2, 0);
                                }

                                canvas.drawImage(image, ix, iy, iw, ih);

                                delete image;
                                image = null;
                            }
                        }
	                    // draw icon
                        if (drawIco)
                        {
                            if (style.type == "runtime" && elem.icon)
                            {
                                var image = new nexacro.Image();
                                image.set_src(elem.icon.value);

                                canvas.drawImage(image, l, t, image.width, image.height);

                                delete image;
                                image = null;
                            }
                            else if (elem._icon_node)
                            {
                                canvas.drawImage(elem._icon_node, l, t, elem._icon_node.width, elem._icon_node.height);
                            }
                        }
	                    // draw text
                        if (!drawTxt)
                        {
                            break;
                        }
	                }
	                case "TextBoxElement":
	                case "InputElement":
	                case "TextAreaElement":
	                {
	                    var drawBox = ( optxt && optxt == "drawBox") && elem.text;
	                    var drawTxt = (!optxt || optxt == "drawTxt") && elem.text;

                        // adjust padding
	                    var padding = elem.textPadding;
	                    if (padding)
	                    {
	                        l += padding.left;
	                        t += padding.top;
                        }
	                    // apply align
	                    var halign = nexacro._getCurrentStyleValue(style, "text-align");
	                    if (halign)
	                    {
	                        canvas.setElementTextAlign(halign);
	                    }
	                    // apply font
	                    var font = nexacro._getCurrentStyleValue(style, "font");
	                    if (font)
	                    {
	                        canvas.setElementFont(nexacro.FontObject(font));
                        }
	                    // apply color
	                    var color = nexacro._getCurrentStyleValue(style, ("color"));
	                    if (color)
	                    {
	                        canvas.setElementFillStyle(nexacro.ColorObject(color));
                        }

                        // draw text
	                    if (drawTxt)
                        {
	                        var text = elem.text;
	                        var x = l;
                            switch(halign)
                            {
                                case "right" : x = l+w;   break;
                                case "center": x = l+w/2; break;
                                case "left"  : x = l;     break;
	                        }

                            canvas.fillText(text, x, t);
                        }
	                    // draw box
                        if (drawBox)
                        {
                            var n = elem.text.length, c = 6, r = 8, s = 1;
                            var x = Math.max(w - (c + s) * n - s, 0);

                            switch(halign)
                            {
                                case "right" : x  = x; break;
                                case "center": x /= 2; break;
                                case "left"  : x  = 0; break;
                            }
                            for (var i = 0, l = l+x, t = (h-r)/2, e = l+w; i < n && l+c < e; i++, l+=c+s)
                            {
                                canvas.drawFillRect(l, t, c, r);
                            }
                        }

	                    break;
	                }
	                case "CanvasElement":
	                {
	                    // draw canvas
	                    break;
	                }
	                case "PluginElement":
	                case "WebBrowserPluginElement":
	                case "VideoPlayerPluginElement":
	                case "GoogleMapElement":
	                {
	                    break;
	                }
	                case "ContainerElement":
	                case "ModalOverlayElement":
	                {
	                    break;
	                }
	            }

                // unclip
	            canvas.restore();
	        }
        };
        // [util.saveImage:drawcomp]                // TODO:FullStyle
        nexacro._drawComponent2Canvas = function (canvas, comp, left, top, optxt, opimg)
        {
            if (canvas && comp)
            {
                var l = left || 0;
                var t = top || 0;

                var control_elem = comp.getElement();
                if (control_elem && control_elem.handle)
                {
                    // draw control/border/back/edge
                    var em = control_elem;
                    if (em)
                    {
                        var b = comp._getCurrentStyleBorder();
                        var bl = b ? b.left._width : 0;
                        var bt = b ? b.top._width : 0;

                        // draw
                        nexacro._drawElement2Canvas(canvas, em, l, t, optxt, opimg);

                        l += bl;
                        t += bt;
                    }

                    // draw nc child
                    var ncchild = comp.getNcChildren ? comp.getNcChildren() : null;
                    if (ncchild)
                    {
                        for (var i = 0, n = ncchild.length; i < n; i++)
                        {
                            var child = ncchild[i];
                            if (child)
                            {
                                var cl = child.getOffsetLeft();
                                var ct = child.getOffsetTop();

                                nexacro._drawComponent2Canvas(canvas, child, l + cl, t + ct, optxt, opimg);
                            }
                        }
                    }

                    // draw simple contents/client/cell
                    var child_elem = control_elem.getContainerElement();
                    child_elem = comp._getClientElement ? comp._getClientElement() : child_elem;
                    child_elem = comp._cell_elem ? comp._cell_elem : child_elem;
                    child_elem = comp._text_elem ? comp._text_elem : child_elem;
                    child_elem = comp._img_elem ? comp._img_elem : child_elem;
                    child_elem = comp._input_element ? comp._input_element : child_elem;

                    if (child_elem && child_elem != control_elem && child_elem.handle)
                    {
                        var el = child_elem.left;
                        var et = child_elem.top;

                        canvas.setElementFont(comp._getCurrentStyleInheritValue("font"));
                        canvas.setElementColor(comp._getCurrentStyleInheritValue("color"));

                        nexacro._drawElement2Canvas(canvas, child_elem, l + el, t + et, optxt, opimg);
                    }

                    // draw children
                    var children = comp._getChildren ? comp._getChildren() : null;
                    if (children)
                    {
                        for (var i = 0, n = children.length; i < n; i++)
                        {
                            var child = children[i];
                            if (child)
                            {
                                var cl = child.getOffsetLeft();
                                var ct = child.getOffsetTop();

                                nexacro._drawComponent2Canvas(canvas, child, l + cl, t + ct, optxt, opimg);
                            }
                        }
                    }

                    // draw itmes
                    var items = comp._getItems ? comp._getItems() : null;
                    if (items)
                    {
                        for (var i = 0, n = items.length; i < n; i++)
                        {
                            var item = items[i];
                            if (item)
                            {
                                var cl = item.getOffsetLeft();
                                var ct = item.getOffsetTop();

                                nexacro._drawComponent2Canvas(canvas, item, l + cl, t + ct, optxt, opimg);
                            }
                        }
                    }
                }
            }
        };
    };

    // [util.notify:notify]                     // TODO:Optimize
    nexacro._setNotifyType = function (type, comp)
    {
        this._notifytype = type;
        this._notifycomp = comp;
    };
    nexacro._notify = function (msg)
    {
        if (this._notifycomp && this._notifycomp.value)
        {
            switch (this._notifytype)
            {
                case "addtext"  : return this._notifycomp.value += msg;
                case "addline"  : return this._notifycomp.value += msg + "\n";
                case "settext"  : return this._notifycomp.value = msg;
            }
        }
        {
            switch (this._notifytype)
            {
                case "alert": return alert(msg);
                case "trace": return trace(msg);
            }
            switch (nexacro._Browser)
            {
                case "Runtime"  : return alert(msg);
                default         : return trace(msg);
            }
        }
    };
    nexacro._errorV8CallStack = function ()
	{
	    if (nexacro.__onNexacroStudioError)
	    {
	        Error.stackTraceLimit = 30;

	        try
	        {
	            var e = new Error();
	            var stack = e.stack;
	            var str = "";

	            // i=0�� ���� �� function
	            for (var i = 1; i < stack.length; i++)
	            {
	                var frame = stack[i];
	                var func = frame.getFunction();
	                var argstr = "";
	                for (var j = 0; j < func.arguments.length; j++)
	                {
	                    var tempstr = func.arguments[j] + ", ";
	                    if (tempstr.length > 30)
	                        argstr += "[LONG STR], ";
	                    else
	                        argstr += tempstr;
	                }

	                var _this = frame.getThis();
	                var _obname = _this.id ? _this.id : _this.name;
	                var _fnname = frame.getFunctionName();
	                str += "\n   " + _this + _obname + "." + _fnname + "(arg: " + argstr + ")";
	            }

	            var mode = 0;
	            //var mode = 1;

	            switch(mode)
	            {
	                case 0:
	                    nexacro.__onNexacroStudioError("\n===[callstack(" + (stack.length - 1) + ")]==============================\n" + str + "\n============================================");
	                    break;
	                case 1:
	                    {
	                        nexacro.__onNexacroStudioError("\n===[callstack(" + (stack.length - 1) + ")]==============================");
	                        var strlist = str.split("\n");
	                        for (var i = 0; i < strlist.length; i++)
	                        {
	                            nexacro.__onNexacroStudioError(strlist[i]);
	                        }
	                        nexacro.__onNexacroStudioError("============================================");
	                    }
	                    break;
	            }
	        }
	        catch (e)
	        {

	        }
	    }
	    else if (Error)
	    {
	        Error.stackTraceLimit = 30;

	        try
	        {
	            var e = new Error();
	            var stack = e.stack;
	            var str = "";

	            // i=0�� ���� �� function
	            for (var i = 1; i < stack.length; i++)
	            {
	                var frame = stack[i];
	                var func = frame.getFunction();
	                var argstr = "";
	                for (var j = 0; j < func.arguments.length; j++)
	                {
	                    var tempstr = func.arguments[j] + ", ";
	                    if (tempstr.length > 30)
	                        argstr += "[LONG STR], ";
	                    else
	                        argstr += tempstr;
	                }

	                var _this = frame.getThis();
	                var _obname = _this.id ? _this.id : _this.name;
	                var _fnname = frame.getFunctionName();
	                str += "\n   " + _this + _obname + "." + _fnname + "(arg: " + argstr + ")";
	            }

	            var mode = 0;
	            //var mode = 1;

	            switch(mode)
	            {
	                case 0:
	                    trace("\n===[callstack(" + (stack.length - 1) + ")]==============================\n" + str + "\n============================================");
	                    break;
	                case 1:
	                    {
	                        trace("\n===[callstack(" + (stack.length - 1) + ")]==============================");
	                        var strlist = str.split("\n");
	                        for (var i = 0; i < strlist.length; i++)
	                        {
	                            trace(strlist[i]);
	                        }
	                        trace("============================================");
	                    }
	                    break;
	            }
	        }
	        catch (e)
	        {

	        }
	    }
	};

};