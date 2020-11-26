/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   responses.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/26 15:14:48 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/26 15:22:20 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports =    {
    ok		    :{code:200, msg:'OK'},
    unauthorized:{code:401, msg:'unauthorized'},
    error		:{code:500, msg:'server error'},
    notfound    :{code:404, msg:'not found'}
}