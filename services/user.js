/**
 * 用户服务
 **/
'use strict';
var mongoose = require('mongoose');
var _ = require('underscore');
var config = require('../config');
var core = require('../libs/core');
var User = mongoose.model('User');
var RoleService = require('./role');


var baseServices = require('./base')(User);

var services = {
    login: function(id, populates) {
        return new Promise(function(resolve, reject) {
            /*var query = Content.findById(id)
            if (populates && populates.length > 0) {
                populates.forEach(function(item) {
                    query = query.populate(item);
                })
            }
            query.exec(function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });*/
        })
    },
    register: function(obj) {
        return new Promise(function(resolve, reject) {
            if (!obj) {
                return reject(null)
            }
            //默认角色
            RoleService.read({status: 202}, function(err, role) {
                console.log('role', role);
                if(err || !role) {
                    console.log('注册失败, 未开放角色:' + config.admin.role.user)
                }
                obj.roles = [role._id];
                obj.reg_ip = core.getIp(req);
                var user = new User(obj);
                user.save(function(err, result) {
                    console.log(result);
                    if (err) {
                        console.log(err);
                    
                    } else {
                        console.log('注册成功')
                    }
                    
                });
            });
        })
    }
};

module.exports = _.extend({}, baseServices, services);
