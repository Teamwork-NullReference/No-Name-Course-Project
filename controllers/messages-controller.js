/* globals module */
'use strict';

module.exports = function ({
    data
}) {
    return {
        getLatestMessages(req, res) {
            let username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {
                    if (user === null || typeof user === 'undefined') {
                        return res.render('profile/user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    let isAuthorizedUser = false;

                    if (req.user &&
                        req.user.role &&
                        (req.user.role.indexOf('admin') >= 0 || username === req.user.username)) {
                        isAuthorizedUser = true;
                    }

                    if (isAuthorizedUser) {
                        return data.getLastMessagesByUsername(username);
                    }

                    res.status(401).render('unauthorized', {
                        result: {
                            user: req.user
                        }
                    });

                    return Promise.reject(`User: ${username} is unauthorized.`);
                })
                .then((latestCorrespondences) => {
                    res.status(200).render('correspondence/latests', {
                        result: {
                            user: req.user,
                            correspondences: latestCorrespondences
                        }
                    });

                    return Promise.resolve();
                })
                .catch((err) => {
                    res.end();
                    res.status(400).render('bad-request', {
                        result: {
                            err
                        }
                    });
                });
        },
        getCorrespondenceDetails(req, res) {
            let username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {

                    if (user === null || typeof user === 'undefined') {
                        return res.render('profile/user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    let isAuthorizedUser = false;

                    if (req.user &&
                        req.user.role &&
                        (req.user.role.indexOf('admin') >= 0 || username === req.user.username)) {
                        isAuthorizedUser = true;
                    }

                    if (isAuthorizedUser) {
                        const rentalId = req.params.correspondenceId;
                        return data.getRentalById(rentalId);
                    }

                    res.status(401).render('unauthorized', {
                        result: {
                            user: req.user
                        }
                    });

                    return Promise.reject(`User: ${username} is unauthorized.`);
                })
                .then((correspondenceDetails) => {
                    res.status(200).render('correspondence/detailed-view', {
                        result: {
                            user: req.user,
                            id: correspondenceDetails._id,
                            car: correspondenceDetails.car,
                            carOwner: correspondenceDetails.carOwner,
                            renter: correspondenceDetails.renter,
                            messages: correspondenceDetails.messages.reverse()
                        }
                    });

                    return Promise.resolve();
                })
                .catch((err) => {
                    res.end();
                    res.status(400).render('bad-request', {
                        result: {
                            err
                        }
                    });
                });
        },
        sendMessage(req, res) {
            let username = req.params.username;
            const rentalId = req.params.correspondenceId;
            data.getUserByUsername(username)
                .then(user => {

                    if (user === null || typeof user === 'undefined') {
                        return res.render('profile/user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    let isAuthorizedUser = false;

                    if (req.user &&
                        req.user.role &&
                        (req.user.role.indexOf('admin') >= 0 || username === req.user.username)) {
                        isAuthorizedUser = true;
                    }

                    if (isAuthorizedUser) {
                        const message = {
                            text: req.body.inputData,
                            date: Date.now(),
                            sender: username
                        };

                        return data.addMessageToRental(rentalId, message);
                    }

                    res.status(401).render('unauthorized', {
                        result: {
                            user: req.user
                        }
                    });

                    return Promise.reject(`User: ${username} is unauthorized.`);
                })
                .then(() => {
                    return res.status(300).redirect(`${rentalId}`);
                })
                .catch(() => {
                    if (req.body.inputData || req.body.inputData.length === 0) {
                        res.end();
                        res.status(300).redirect(`${rentalId}`);
                    }
                });
        }
    };
};